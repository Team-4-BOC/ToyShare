const db = require('../../database/pg.js');

module.exports = {
  // getAll: (Kevin) => {
  //   return db.query("SELECT * FROM sdc.cart;");
  // },
  getOne: (query) => {
    const values = [query.toyId, query.userId !== undefined ? query.userId : 0];
    return db.query(`
    SELECT
      t.toy_name AS name,
      t.rating,
      t.toy_description AS description,
      t.original_price,
      t.rental_price,
      t.delivery_method,
      t.payment_method,
      t.user_id,
      u.first_name AS user,
      u.city_state AS location,
      d.dates AS next_date,
      u.lat_lng AS latLng,
      (
        SELECT json_agg(tp.url)
        FROM toyshare.toy_photos tp
        WHERE tp.toy_id =  t.id
      )
      AS photos,
      CASE WHEN st.toy_id IS NULL THEN false ELSE true END AS saved,
    (
      SELECT up.url
      FROM toyshare.user_photos up
      WHERE up.user_id = u.id
    ) AS user_photo
    FROM toyshare.toys t
    JOIN toyshare.users u ON t.user_id = u.id
    JOIN toyshare.dates_available d ON d.toy_id = t.id AND toy_status = 1 AND dates > CURRENT_DATE
    LEFT JOIN toyshare.saved_toys st ON t.id = st.toy_id AND st.user_id = $2
    WHERE t.id = $1
    ORDER BY d.dates ASC
    LIMIT 1`
    , values);
  },
  getAll: (query) => {
    const page = query.page ? query.page : 1;
    const count = query.count ? query.count : 5;
    const offset = (page - 1) * count;
    const values = [count, offset];

    return db.query(`
    SELECT
      toys.*,
      array_agg(toy_photos.url) AS photos
    FROM
      toyshare.toys
    LEFT JOIN
      toyshare.toy_photos ON toys.id = toy_photos.toy_id
    GROUP BY
      toys.id
    ORDER BY
      toys.id
    LIMIT $1 OFFSET $2;
    `, values);
  },
  getAllIDCoordsPhoto: () => {
    return (db.query(`
    SELECT
      t.id AS id,
      t.toy_name AS name,
      u.lat_lng AS latLng,
      p.url AS photo
    FROM
        toyshare.toys t
    JOIN
        toyshare.users u ON t.user_id = u.id
    LEFT JOIN
    (
      SELECT
        toy_id,
        url,
        ROW_NUMBER() OVER (PARTITION BY toy_id ORDER BY url) AS row_num
      FROM
        toyshare.toy_photos
    ) p ON t.id = p.toy_id AND p.row_num = 1
    `));
  },
  // put: (Nick) => {
  //   return db.query("SELECT * FROM sdc.cart;");
  // },
  post: (data) => {
    const values = [data.toy_name, data.category_id, data.rating, data.user_id, data.toy_description, data.original_price, data.rental_price, data.delivery_method, data.payment_method];
    return db.query('INSERT INTO toyshare.toys(toy_name, category_id, rating, user_id, toy_description, original_price, rental_price, delivery_method, payment_method) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;', values);
  },
  getOnePhotos: (data) => {
    const values = [data.toyId];
    console.log(values);
    return db.query('SELECT * from toyshare.toy_photos where toy_id = $1;', values);
  },
  postPhotos: (data) => {
    const queries = data.photoURLs.map((url) => {
      const values = [data.toyId, url];
      return db.query('INSERT INTO toyshare.toy_photos(toy_id, url) VALUES($1, $2)', values);
    });
    return Promise.all(queries);
  },
  getCategory: (data) => {
    return db.query('SELECT * from toyshare.category');
  },
  postCategory: (data) => {
    const values = [data.category];
    return db.query('INSERT INTO toyshare.category(name) VALUES($1)', values);
  },
  postDates: (data) => {
    const queries = data.dates.map((date) => {
      const values = [data.toyId, date, 1];
      return db.query('INSERT INTO toyshare.dates_available(toy_id, dates, toy_status) VALUES($1, $2, $3)', values);
    });
    return Promise.all(queries);
  },
  getDates: (data) => {
    const values = [data.toyId];
    console.log(values);
    return db.query('SELECT * FROM toyshare.dates_available WHERE toy_id = $1;', values);
  },
  save: (data) => {
    const values = [data.toyId, data.userId];
    return db.query('INSERT INTO toyshare.saved_toys(toy_id, user_id) VALUES($1, $2)', values);
  }
};
