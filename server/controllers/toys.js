const models = require('../models');

module.exports = {
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
  getOne: (req, res) => {
    if (!req.query.toy_id) {
      res.status(404).send('Please input toy_id');
      return;
    }
    models.toys.getOne(req.query)
      .then((results) => {
        if (!results.rows[0]) {
          res.status(404).send('No toys with this id found');
          return;
        }
        res.status(200).send(results.rows[0]);
      })
      .catch((err) => {
        res.status(404).send('ERROR retrieving toy ' + JSON.stringify(err));
        console.log('ERROR querying toy', err);
      });
  },
  getAll: (req, res) => {
    models.toys.getAll(req.query)
      .then((results) => {
        res.status(201).send(results);
      })
      .catch((err) => {
        res.status(500).send('ERROR GET toys');
        console.log('ERROR GET toys', err);
      });
  },
  post: (req, res) => {
    models.toys.post(req.body)
      .then((results) => {
        res.status(201).send('Succesfully added toy!');
      })
      .catch((err) => {
        res.status(500).send('ERROR adding toy');
        console.log('ERROR ADDING TOY', err);
      });
    // console.log(models.toys.post());
  },
  saved: (req, res) => {
    if (!req.body.toy_id || !req.body.current_user_id) {
      res.status(500).send('Please input current_user_id and toy_id');
      return;
    }
    models.toys.save(req.body)
      .then(() => {
        res.status(202).send('Succesfully favorited toy!');
      })
      .catch((err) => {
        res.status(500).send('ERROR favoriting toy');
        console.log('ERROR ADDING TOY', err);
      });
  }
};
