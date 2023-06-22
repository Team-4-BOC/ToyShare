const { Pool } = require('pg');
require('dotenv').config();

const username = process.env.DBUSER;
//
const pool = new Pool({
  user: username,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

module.exports = {
  query: (text, params) => {
    console.log('Query submitted', { text, params });
    return pool.query(text, params);
  }
};
