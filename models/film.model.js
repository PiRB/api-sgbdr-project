const mariaDB = require('./db');

exports.fetchAll = async (limit = 10, page = 1, orderColumn = 1, orderDesc = 0, result) => {
  const orderColumns = {
    1: 'film.title',
    2: 'price',
    3: 'rating',
    4: 'category',
    5: 'nbOfRates',
  }
  const data = {};
  let nbFilms = 0;

  try {
    let queryNbOfFilms = `
      select count(film_id) as nbFilms from film
    `;
    const nbOfFilms = await mariaDB.query(queryNbOfFilms);
    nbFilms = nbOfFilms[0].nbFilms
    data.nbPages = nbOfFilms[0].nbFilms / (Number(limit) === 0 ? 1 : limit);

    let query = `
      select title, rating, category.name as category, count(rental.rental_id) as nbOfRates, payment.amount as price
      from film
      left join film_category using(film_id)
      left join category using(category_id)
      left join inventory using(film_id)
      left join rental using(inventory_id)
      left join payment using(rental_id)
      group by film.title
      order by ${!orderColumns[orderColumn] ? 'film.title' : orderColumns[orderColumn]} ${Number(orderDesc) === 1 ? 'desc' : 'asc'}
      ${limit > 0 ? `limit ${limit}` : `limit ${nbFilms}`}
      offset ${(page - 1) * limit};
    `;
    const films = await mariaDB.query(query);
    data.films = films;
    
    result(null, data);
  } catch (error) {
    throw error;
  }
}