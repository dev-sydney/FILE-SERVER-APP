const express = require('express');

const authController = require('./../controllers/authController');
const clientsController = require('./../controllers/clientsController');

const router = express.Router();

router.use(authController.authenticateUser);

router
  .route('/')
  .post(
    authController.restrictAccessTo('business'),
    clientsController.addClientContact
  );
module.exports = router;
