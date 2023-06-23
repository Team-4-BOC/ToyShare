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
  },
  addUserPhoto: (userPhoto) => {
    console.log('inside addUserPhoto model', userPhoto);
  },
  checkForNewUser: (email) => {
    console.log('inside checkForNewUser model', email);
  }
};
