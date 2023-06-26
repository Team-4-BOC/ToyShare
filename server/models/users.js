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
  getOneMeta: async (data) => {
    const values = [data.id];
    const result = {};
    const user = await db.query('SELECT * from toyshare.users where id = $1', values);
    const photo = await db.query('SELECT * from toyshare.user_photos where user_id = $1', values);
    const inventory = await db.query('SELECT * from toyshare.toys where user_id = $1', values);
    const historyID = await db.query('SELECT * from toyshare.toy_rental_history where user_id = $1', values);
    const savedID = await db.query('SELECT * from toyshare.saved_toys where user_id = $1', values);
    const toysHist = [];
    for (let i = 0; i < historyID.rows.length; i++) {
      const toy = await db.query('SELECT * from toyshare.toys where id = $1', [historyID.rows[i].toy_id]);
      toysHist.push(toy.rows[0]);
    }
    const toysSaved = [];
    for (let i = 0; i < savedID.rows.length; i++) {
      const toy = await db.query('SELECT * from toyshare.toys where id = $1', [savedID.rows[i].toy_id]);
      toysSaved.push(toy.rows[0]);
    }
    result.user = user.rows[0];
    result.photo = photo.rows[0].url;
    result.inventory = inventory.rows;
    result.history = toysHist;
    result.saved = toysSaved;
    return result;
  },
  addUser: (userInfo) => {
    console.log('inside addUser model', userInfo);
    const values = [userInfo.first_name, userInfo.last_name, userInfo.email, false];
    return db.query('INSERT INTO toyshare.users (first_name, last_name, email, signed_in) VALUES($1, $2, $3, $4)', values);
  },
  addUserPhoto: (photoData) => {
    console.log('inside addUserPhoto model', photoData);
    const values = [photoData.id, photoData.url];
    return db.query('INSERT INTO toyshare.user_photos (user_id, url) VALUES($1, $2)', values);
  },
  checkForNewUser: (email) => {
    console.log('inside checkForNewUser model', email);
    const values = [email];
    return db.query('SELECT * from toyshare.users where email = $1', values);
  }
};

// INSERT INTO toyshare.users (first_name, last_name, email, signed_in) VALUES('John', 'Doe', 'test@test.com', false);
// DELETE FROM toyshare.users WHERE email = 'test@test.com';
