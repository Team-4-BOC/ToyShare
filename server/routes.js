const generateUploadURL = require('./s3.js');
const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/', function (req, res) {
  res.render('index.html');
});

router.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
//  console.log(s3.generateUploadURL());
});

router.post('/toys', controllers.toys.post);

router.get('/user', controllers.users.getOne);

router.get('/userpf', controllers.users.getOneMeta);
router.get('/renteepf', controllers.users.getRenteeData);
router.post('/user', controllers.users.addUser);
router.post('/user/photos', controllers.users.addUserPhoto);
router.get('/userNew', controllers.users.checkForNewUser);

router.get('/toy', controllers.toys.getOne);

router.get('/toys', controllers.toys.getAll);

router.post('/saved', controllers.toys.saved);

router.get('/bookings/getAllBooked', controllers.bookings.getAllBooked);
router.get('/bookings/getAllAvailable', controllers.bookings.getAllAvailable);
router.get('/bookings/getInventory', controllers.bookings.getInventory);
router.get('/bookings/getRental', controllers.bookings.getRental);

router.post('/bookings/postInventory', controllers.bookings.postInventory);
router.post('/bookings/postRental', controllers.bookings.postRental);

router.put('/bookings/updateStatus', controllers.bookings.updateStatus);

// Examples:

// router.get('/products/:product_id', controllers.product.getOne);

// router.get('/products/:product_id/styles', controllers.styles.get);

// router.get('/products/:product_id/related', controllers.related.get);

// router.get('/cart', controllers.cart.get);

// router.post('/cart', controllers.cart.post);

module.exports = router;
