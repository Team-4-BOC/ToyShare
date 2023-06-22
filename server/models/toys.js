const db = require('../../database/pg.js');

module.exports = {
  // getAll: (Kevin) => {
  //   return db.query("SELECT * FROM sdc.cart;");
  // },
  // getOne: (Brady) => {
  //   return db.query("SELECT * FROM sdc.cart;");
  // },
  // put: (Nick) => {
  //   return db.query("SELECT * FROM sdc.cart;");
  // },
  post: (data) => {
    const values = [data.toy_name, data.category_id, data.rating, data.user_id, data.toy_description, data.original_price, data.rental_price, data.delivery_method, data.payment_method];
    return db.query('INSERT INTO toyshare.toys(toy_name, category_id, rating, user_id, toy_description, original_price, rental_price, delivery_method, payment_method) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);', values);
  }
};
