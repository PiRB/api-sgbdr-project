const mysql = require('mysql');
const databaseConfig = require('../config/db.js');

const connection = mysql.createConnection({
  host: databaseConfig.HOST,
  port: databaseConfig.PORT,
  user: databaseConfig.USER,
  password: databaseConfig.PASSWORD,
  schema: databaseConfig.SCHEMA,

});

connection.connect(err => {
  if(err) throw err;
  console.log('Successfully logged');
});

module.exports = connection;
