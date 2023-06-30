const models = require('../models');

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
  getRenteeData: (req, res) => {
    models.users.getRenteeData(req.query)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log('ERROR GET getRenteeData', err);
      });
  },
  getCoordinates: (req, res) => {
    console.log(req.query.id);
    if (!req.query.id) {
      res.status(500).send('Please input id');
      return;
    }
    models.users.getCoordinates(req.query)
      .then((result) => {
        if (!result.rows[0]) {
          res.status(500).send(JSON.stringify('LAT_LNG field missing in database'));
          return;
        }
        res.send(result.rows[0].lat_lng);
      })
      .catch((err) => {
        res.status(500).send(JSON.stringify(err));
        console.log('ERROR GET coords', err);
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
    models.users.addUserPhoto(req.body)
      .then(() => {
        console.log('photo added to users photos table');
        res.status(201).send('hello');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
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
  },
  updateUser: (req, res) => {
    models.users.updateUser(req.body)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  deleteUser: (req, res) => {
    // console.log('ID----><><><><', req.query.id)
    models.users.deleteOne(req.query.id)
      .then(() => {
        console.log('user deleted');
        res.status(200).send();
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};
