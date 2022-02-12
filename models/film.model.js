const mariaDB = require('./db');

exports.fetchAll = (limit, page, orderColumn, orderDesc, result) => {
  const orderColumns = {
    1: 'film.title',
    2: 'payment.price',
    3: 'rating',
    4: 'category.name',
    5: 'nbOfRate',
  }

  let query = `
    select film.title, rating, category.name, count(rent.rental_id) as nbOfRate, payment.price
    from film
    inner join film_category AS film_category ON film.film_id = film_category.film_id
    inner join category AS category ON film_category.category_id = category.category_id
    inner join inventory AS inventory ON film.film_id = inventory.film_id
    inner join rental AS rental ON inv.inventory_id = rent.inventory_id
    inner join payment AS payment ON rental.rental_id = payment.rental_id
    group by film.title
    order by ${!orderColumns[orderColumn] ? 'film.title' : orderColumns[orderColumn]} ${Number(orderDesc) === 1 ? 'desc' : 'asc'}
    limit ${limit}
    offset ${(page - 1) * limit};
  `;

  const data = {};

  mariaDB.query(query, (err, res) => {
    if(err) throw err;
    data.films = res;
  });

  let queryNumberOfFilms = `
    select count(film_id) as nbOfFilms from film
  `

  mariaDB.query(queryNumberOfFilms, (err, res) => {
    if(err) throw err;
    data.nbOfPages = res[0].nbOfFilms / limit;
    result(null, data);
  });
}