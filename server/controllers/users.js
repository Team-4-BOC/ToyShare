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
  },
  addUser: (req, res) => {
    console.log('inside addUser controller', req.body);
    models.users.addUser(req.body)
      .then(() => {
        console.log('user added to users table');
        res.status(201).send('user added');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  addUserPhoto: (req, res) => {
    console.log('inside addUserPhoto controller', req.body);
    // models.users.addUserPhoto()
    //   .then(() => {
    //     console.log('photo added to users photos table');
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });
  },
  checkForNewUser: (req, res) => {
    console.log('inside checkForNewUser controller', req.query.email);
    models.users.checkForNewUser(req.query.email)
      .then((data) => {
        console.log('inside then of checkForNewUser controller', data.rows);
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};
