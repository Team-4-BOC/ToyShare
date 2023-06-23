const db = require('../../database/pg.js');

module.exports = {
    getAllBooked: (data) => {
        const values = [data.toy_id];
        return db.query('SELECT * FROM toyshare.dates_available WHERE toy_id = $1 AND toy_status = 2;', values);
    },
    getAllAvailable: (data) => {
        const values = [data.toy_id];
        return db.query('SELECT * FROM toyshare.dates_available WHERE toy_id = $1 AND toy_status = 1;', values);
    },
    getOneStatus: (data) => {
        const values = [data.toy_id, data.date];
        return db.query('SELECT * FROM toyshare.dates_available WHERE toy_id = $1 AND dates = $2;', values);
    },
    getAllStatus: (data) => {
        const values = [data.toy_id, data.dates];
        return db.query('SELECT * FROM toyshare.dates_available WHERE toy_id = $1 AND dates = ANY($2);', values);
    },
    put: (data) => {
        const values = [data.toy_id, data.dates];
        return db.query('UPDATE toyshare.dates_available SET toy_status = 2 WHERE toy_id = $1 AND toy_status = 1 AND dates = ANY($2);', values);
    },
    postInventory: (data) => {
        const values = [data.user_id, data.toy_id];
        return db.query('INSERT INTO toyshare.inventory_out(user_id, toy_id) VALUES($1, $2);', values);
    },
    postRental: (data) => {
        const values = [data.user_id, data.toy_id];
        return db.query('INSERT INTO toyshare.toy_rental_history(user_id, toy_id) VALUES($1, $2);', values);
    },
    getInventory: (data) => {
        const values = [data.user_id, data.toy_id];
        return db.query('SELECT * FROM toyshare.inventory_out WHERE user_id = $1 AND toy_id = $2;', values);
    },
    getRental: (data) => {
        const values = [data.user_id, data.toy_id];
        return db.query('SELECT * FROM toyshare.toy_rental_history WHERE user_id = $1 AND toy_id = $2;', values);
    }
};