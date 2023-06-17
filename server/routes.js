const express = require('express');
const router = express.Router();
// const controllers = require('./controllers');

router.get('/', function (req, res) {
  res.render('index.html');
});

// Examples:
// router.get('/products', controllers.product.getAll);

// router.get('/products/:product_id', controllers.product.getOne);

// router.get('/products/:product_id/styles', controllers.styles.get);

// router.get('/products/:product_id/related', controllers.related.get);

// router.get('/cart', controllers.cart.get);

// router.post('/cart', controllers.cart.post);

module.exports = router;
