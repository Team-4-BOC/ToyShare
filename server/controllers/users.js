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
    console.log(req.query);
    models.users.getOne(req.query)
      .then((results) => {
        res.send(results.rows);
      });
  },
  addUser: (req, res) => {
    console.log('inside addUser controller', req.body);
    // models.users.addUser()
    //   .then(() => {
    //     console.log('user added to users table');
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });
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
    console.log('inside checkForNewUser controller', req.query);
    // models.users.checkForNewUser()
    //   .then(() => {
    //     console.log('photo added to users photos table');
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });
  }
};
