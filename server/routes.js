const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/', function (req, res) {
  res.render('index.html');
});

router.post('/toys', controllers.toys.post);

router.get('/user', controllers.users.getOne);

router.post('/bookings/getAllBooked', controllers.bookings.getAllBooked);

router.post('/bookings/getAllAvailable', controllers.bookings.getAllAvailable);


// Examples:

// router.get('/products/:product_id', controllers.product.getOne);

// router.get('/products/:product_id/styles', controllers.styles.get);

// router.get('/products/:product_id/related', controllers.related.get);

// router.get('/cart', controllers.cart.get);

// router.post('/cart', controllers.cart.post);

module.exports = router;
