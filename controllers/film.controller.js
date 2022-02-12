const Film = require('../models/film.model');

exports.getAll = (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const orderColumn = req.query.orderColumn;
  const orderDesc = req.query.orderDesc;

  Film.fetchAll(limit, page, orderColumn, orderDesc, (err, res) => {
    if(err) { const { msg } = err; res.status(500).send({ msg }); }
    res.send(data)
  });
}