const models = require('../models');

module.exports = {
  getOne: (req, res) => {
    if (!req.query.toyId) {
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
        res.status(201).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR GET toys');
        console.log('ERROR GET toys', err);
      });
  },
  getAllIDCoordsPhoto: (req, res) => {
    models.toys.getAllIDCoordsPhoto(req.query)
      .then((results) => {
        res.status(201).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR GET toys');
        console.log('ERROR GET toys', err);
      });
  },
  post: (req, res) => {
    models.toys.post(req.body)
      .then((results) => {
        res.status(201).send(results);
      })
      .catch((err) => {
        res.status(500).send('ERROR adding toy');
        console.log('ERROR ADDING TOY', err);
      });
  },
  put: (req, res) => {
    models.toys.put(req.body)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        res.status(500).send('ERROR updating toy');
        console.log('ERROR updating TOY', err);
      });
  },
  getOnePhotos: (req, res) => {
    models.toys.getOnePhotos(req.query)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting toy photos');
        console.log('RROR getting toy photos', err);
      });
  },
  postPhotos: (req, res) => {
    models.toys.postPhotos(req.body)
      .then((results) => {
        res.status(201).send('Successfully added toy photo!');
      })
      .catch((err) => {
        res.status(500).send('ERROR adding toy photo');
        console.log('ERROR ADDING TOY photo', err);
      });
  },
  deletePhotos: (req, res) => {
    models.toys.deletePhotos(req.body)
      .then((results) => {
        res.status(204).send('Successfully deleted toy photo!');
      })
      .catch((err) => {
        res.status(500).send('ERROR deleting toy photo');
        console.log('ERROR deleting TOY photo', err);
      });
  },
  getCategory: (req, res) => {
    models.toys.getCategory(req.query)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR GET category');
        console.log('ERROR GET category', err);
      });
  },
  postCategory: (req, res) => {
    models.toys.postCategory(req.body)
      .then((results) => {
        res.status(201).send('Successfully added category!');
      })
      .catch((err) => {
        res.status(500).send('ERROR adding category');
        console.log('ERROR ADDING Category', err);
      });
  },
  postDates: (req, res) => {
    models.toys.postDates(req.body)
      .then((results) => {
        res.status(201).send('Succesfully added Dates');
      })
      .catch((err) => {
        res.status(500).send('ERROR posting dates');
        console.log('ERROR posting dates', err);
      });
  },
  getDates: (req, res) => {
    models.toys.getDates(req.query)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting dates');
        console.log('ERROR getting dates', err);
      });
  },
  saved: (req, res) => {
    if (!req.body.toyId || !req.body.userId) {
      res.status(500).send('Please input userId and toyId');
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
