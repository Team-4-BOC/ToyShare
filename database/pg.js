const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

module.exports = {
  query: (text, params) => {
    console.log('Query submitted', { text, params });
    console.log(process.env.USER);
    return pool.query(text, params);
  }
};
