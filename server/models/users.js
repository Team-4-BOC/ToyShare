const db = require('../../database/pg.js');

// module.exports = {
//   get: (Kyle) => {
//     return db.query("SELECT * FROM sdc.cart;");
//   },
//   put: (Justin) => {
//     return db.query("SELECT * FROM sdc.cart;");
//   },
//   post: (Justin) => {
//     return db.query("SELECT * FROM sdc.cart;");
//   },
// };

module.exports = {
  getOne: (data) => {
    const values = [data.id];
    return db.query('SELECT * from toyshare.users where id = $1', values);
  },
  addUser: (userInfo) => {
    console.log('inside addUser model', userInfo);
    const values = [userInfo.first_name, userInfo.last_name, userInfo.email, false];
    return db.query('INSERT INTO toyshare.users (first_name, last_name, email, signed_in), VALUES($1, $1, $1, $1)', values);
  },
  addUserPhoto: (userPhoto) => {
    console.log('inside addUserPhoto model', userPhoto);
  },
  checkForNewUser: (email) => {
    console.log('inside checkForNewUser model', email);
    const values = [email];
    return db.query('SELECT * from toyshare.users where email = $1', values);
  }
};
