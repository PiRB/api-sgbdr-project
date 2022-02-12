require('dotenv').config();

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DATABASE: process.env.DATABASE
};