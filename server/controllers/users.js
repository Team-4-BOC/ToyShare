const models = require('../models');

// module.exports = {
//   get: (req, res) => {
//     models.cart
//       .get()
//       .then((results) => {
//         res.status(200).send(results.rows);
//         console.log(results);
//       })
//       .catch((err) => {
//         res.status(500).send("ERROR getting cart data");
//       });
//   },
//   post: (req, res) => {
//     res.send("Posting cart in controllers");
//   },
//   put: (req, res) => {
//     res.send("Updating cart in controllers");
//   },
// };

module.exports = {
  getOne: (req, res) => {
    models.users.getOne(req.query)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR GET user');
        console.log('ERROR GET user', err);
      });
  },
  getOneMeta: (req, res) => {
    models.users.getOneMeta(req.query)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        res.status(500).send('ERROR GET user meta');
        console.log('ERROR GET user meta', err);
      });
  }
};
