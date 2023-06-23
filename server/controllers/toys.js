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
  }
//   put: (req, res) => {
//     res.send("Updating cart in controllers");
//   },
};
