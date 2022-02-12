
const mariaDB = require('mariadb');
const config = require('../config/db.js');

const connection = mariaDB.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  port: config.DB_PORT,
  database: config.DATABASE
});

connection.getConnection()
  .then(() => {
    console.log('Successfully connected');
  })
  .catch((err) => {
    throw err;
  });

module.exports = connection;
