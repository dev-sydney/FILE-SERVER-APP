const express = require('express');

const authController = require('./../controllers/authController');
const clientsController = require('./../controllers/clientsController');

const router = express.Router();

router.use(authController.authenticateUser);

router.use(authController.restrictAccessTo('business'));

router
  .route('/')
  .post(clientsController.addClientContact)
  .get(clientsController.getAllClientsContacts);

router.route('/:client_id').patch(clientsController.updateClientContact);
module.exports = router;
