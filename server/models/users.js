const { getByLabelText, renderHook } = require('@testing-library/react');
const db = require('../../database/pg.js');
const axios = require('axios');
require('dotenv').config();

const getCoordinates = (location, cb) => { // cb = (err, data) =>
  location = location.replace(' ', '%20');
  return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MAPBOX_KEY}&types=place&limit=1`)
    .then((apiData) => {
      const lngLat = apiData.data.features[0].geometry.coordinates;
      cb(null, lngLat[1] + ',' + lngLat[0]);
    })
    .catch((err) => {
      console.log('ERROR fetching coordinates ', err);
      cb(err, null);
    });
};

// getCoordinates('Tahoe city, C.A ', (err, data) => { Example
//   console.log(data);
//   db.query(`UPDATE toyshare.users SET lat_lng = '${data}' where id = 49;`)
//   .then(() => {
//     console.log('worked')
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// });

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
    if (photo.rows.length === 0) {
      result.photo = 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png';
    } else {
      result.photo = photo.rows[0].url;
    }
    result.inventory = inventory.rows;
    result.history = toysHist;
    result.saved = toysSaved;
    return result;
  },
  getRenteeData: async (data) => {
    const values = [data.id];
    const result = {};
    const user = await db.query('SELECT * from toyshare.users where id = $1', values);
    const photo = await db.query('SELECT * from toyshare.user_photos where user_id = $1', values);
    const inventory = await db.query('SELECT * from toyshare.toys where user_id = $1', values);
    if (photo.rows.length === 0) {
      result.photo = 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png';
    } else {
      result.photo = photo.rows[0].url;
    }
    result.user = user.rows[0];
    result.inventory = inventory.rows;
    return result;
  },
  getCoordinates: (query) => {
    const values = [query.id];
    return db.query(`
    SELECT
      lat_lng
    FROM
      toyshare.users
    WHERE
      id = $1
    `, values);
  },
  addUser: (userInfo) => {
    console.log('inside addUser model', userInfo);
    const values = [userInfo.first_name, userInfo.last_name, userInfo.email, false];
    return db.query('INSERT INTO toyshare.users (first_name, last_name, email, signed_in) VALUES($1, $2, $3, $4)', values);
  },
  addUserPhoto: (photoData) => {
    console.log('inside addUserPhoto model', photoData);
    if (!photoData.url) {
      photoData.url = 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png';
    }
    const values = [photoData.user_id, photoData.url];
    console.log('ADDDDD USERRR PHOTOSSSS', values);
    return db.query('INSERT INTO toyshare.user_photos (user_id, url) VALUES($1, $2)', values);
  },
  updateUserPhoto: async (photoData) => {
    const values = [photoData.photoURL[0], photoData.id];
    const userPhoto = await db.query('SELECT * from toyshare.user_photos where user_id = $1', [values[1]]);
    if (userPhoto.rows.length === 0) {
      await db.query('INSERT INTO toyshare.user_photos (url, user_id) VALUES($1, $2)', values);
    } else {
      return db.query('UPDATE toyshare.user_photos SET url = $1 where user_id = $2', values);
    }
  },
  checkForNewUser: (email) => {
    console.log('inside checkForNewUser model', email);
    const values = [email];
    return db.query('SELECT * from toyshare.users where email = $1', values);
  },
  updateUser: (userInfo) => {
    const values = [userInfo.first_name, userInfo.last_name, userInfo.city_state, userInfo.introduction, userInfo.id];
    return db.query('UPDATE toyshare.users SET first_name = $1, last_name = $2, city_state = $3, introduction = $4 where id = $5', values);
  },
  deleteOne: (id) => {
    console.log('inside deleteOne model', id);
    const value = [id];
    return db.query('DELETE FROM toyshare.users WHERE id = $1', value);
  },
  sendNotification: async (data) => {
    const user = await db.query('SELECT * from toyshare.users where id = $1', [data.user_id]);
    const name = user.rows[0].first_name + ' ' + user.rows[0].last_name;
    const values = [data.toyUserId, `${name} just booked your toy!`, false];
    return db.query('INSERT INTO toyshare.notifications (user_id, message, read) VALUES($1, $2, $3)', values);
  },
  getNotifications: (data) => {
    const values = [data.user_id];
    return db.query('SELECT * from toyshare.notifications where user_id = $1', values);
  },
  readNotifications: (data) => {
    const values = [true, data.user_id];
    return db.query('UPDATE toyshare.notifications SET read = $1 where user_id = $2', values);
  },
  deleteNotifications: (data) => {
    const values = [data.user_id];
    return db.query('DELETE FROM toyshare.notifications where user_id = $1', values);
  }
};
