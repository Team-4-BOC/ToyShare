const db = require('../../database/pg.js');

module.exports = {
  getAllBooked: ({ toyId }) => {
    const values = [toyId];
    return db.query('SELECT * FROM toyshare.dates_available WHERE toy_id = $1 AND toy_status = 2;', values);
  },
  getAllAvailable: ({ toyId }) => {
    const values = [toyId];
    return db.query('SELECT * FROM toyshare.dates_available WHERE toy_id = $1 AND toy_status = 1;', values);
  },
  updateStatus: (data) => {
    const values = [data.toyId, data.dates];
    return db.query('UPDATE toyshare.dates_available SET toy_status = 2 WHERE toy_id = $1 AND toy_status = 1 AND dates = ANY($2);', values);
  },
  postInventory: (data) => {
    const values = [data.toyUserId, data.toyId];
    return db.query('INSERT INTO toyshare.inventory_out(user_id, toy_id) VALUES($1, $2);', values);
  },
  postRental: (data) => {
    const values = [data.userId, data.toyId];
    return db.query('INSERT INTO toyshare.toy_rental_history(user_id, toy_id) VALUES($1, $2);', values);
  },
  getInventory: (data) => {
    const values = [data.userId, data.toyId];
    return db.query('SELECT * FROM toyshare.inventory_out WHERE user_id = $1 AND toy_id = $2;', values);
  },
  getRental: (data) => {
    const values = [data.userId, data.toyId];
    return db.query('SELECT * FROM toyshare.toy_rental_history WHERE user_id = $1 AND toy_id = $2;', values);
  },
  getEarliestInstanceOfEachToy: () => {
    return db.query('SELECT DISTINCT ON (toy_id) * FROM toyshare.dates_available ORDER BY toy_id, id;');
  }
};
