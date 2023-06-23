const models = require('../models/bookings');

module.exports = {
  put: (req, res) => {
    models.put(req.body)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        res.status(500).send('ERROR updating booking');
        console.log('ERROR updating booking', err);
      });
  },
  getAllBooked: (req, res) => {
    models.getAllBooked(req.body)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting all booked');
        console.log('ERROR getting all booked', err);
      });
  },
  getAllAvailable: (req, res) => {
    models.getAllAvailable(req.body)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting all available');
        console.log('ERROR getting all available', err);
      });
  },
  getOneStatus: (req, res) => {
    models.getOneStatus(req.body)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting one status');
        console.log('ERROR getting one status', err);
      });
  },
  getAllStatus: (req, res) => {
    models.getAllStatus(req.body)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting all status');
        console.log('ERROR getting all status', err);
      });
  },
  getInventory: (req, res) => {
    models.getInventory(req.body)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting inventory');
        console.log('ERROR getting inventor', err);
      });
  },
  getRental: (req, res) => {
    models.getRental(req.body)
      .then((results) => {
        res.status(200).send(results.rows);
      })
      .catch((err) => {
        res.status(500).send('ERROR getting rental history');
        console.log('ERROR getting rental history', err);
      });
  },
  postInventory: (req, res) => {
    models.postInventory(req.body)
      .then((results) => {
        res.status(201).send(results);
      })
      .catch((err) => {
        res.status(500).send('ERROR posting inventory');
        console.log('ERROR posting inventory', err);
      });
  },
  postRental: (req, res) => {
    models.postRental(req.body)
      .then((results) => {
        res.status(201).send(results);
      })
      .catch((err) => {
        res.status(500).send('ERROR posting rental');
        console.log('ERROR posting rental', err);
      });
  }
};