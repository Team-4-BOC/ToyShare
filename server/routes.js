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
});

router.post('/toys', controllers.toys.post);
router.put('/toys', controllers.toys.put);
router.delete('/toys', controllers.toys.delete);
router.post('/toys/photos', controllers.toys.postPhotos);
router.get('/toys/photos', controllers.toys.getOnePhotos);
router.delete('/toys/photos', controllers.toys.deletePhotos);
router.get('/toys/category', controllers.toys.getCategory);
router.post('/toys/category', controllers.toys.postCategory);
router.get('/toys/dates', controllers.toys.getDates);
router.post('/toys/dates', controllers.toys.postDates);
router.delete('/toys/dates', controllers.toys.deleteAllDates);

router.get('/user', controllers.users.getOne);
router.get('/userpf', controllers.users.getOneMeta);
router.put('/userpf', controllers.users.updateUser);
router.get('/renteepf', controllers.users.getRenteeData);
router.get('/userCoordinates', controllers.users.getCoordinates);
router.post('/user', controllers.users.addUser);
router.post('/user/photos', controllers.users.addUserPhoto);
router.put('/user/photos', controllers.users.updateUserPhoto);
router.get('/userNew', controllers.users.checkForNewUser);
router.post('/notifications', controllers.users.sendNotification);
router.get('/notifications', controllers.users.getNotifications);
router.put('/notifications', controllers.users.readNotifications);
router.delete('/notifications', controllers.users.deleteNotifications);
router.delete('/deleteUser', controllers.users.deleteUser);

router.get('/toy', controllers.toys.getOne);

router.get('/toys', controllers.toys.getAll);

router.get('/toysIDCoordsPhoto', controllers.toys.getAllIDCoordsPhoto);

router.post('/saved', controllers.toys.saved);
router.get('/saved', controllers.toys.getSaved);

router.get('/bookings/getAllBooked', controllers.bookings.getAllBooked);
router.get('/bookings/getAllAvailable', controllers.bookings.getAllAvailable);
router.get('/bookings/getInventory', controllers.bookings.getInventory);
router.get('/bookings/getRental', controllers.bookings.getRental);
router.get('/bookings/getEarliestInstanceOfEachToy', controllers.bookings.getEarliestInstanceOfEachToy);
router.post('/bookings/postInventory', controllers.bookings.postInventory);
router.post('/bookings/postRental', controllers.bookings.postRental);

router.put('/bookings/updateStatus', controllers.bookings.updateStatus);

module.exports = router;
