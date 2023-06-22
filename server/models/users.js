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
  getOne: () => {
    console.log('hey');
    return 'success';
  }
};
