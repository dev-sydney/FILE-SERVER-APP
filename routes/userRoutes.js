const express = require('express');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/login').post(authController.loginUser);

router.route('/signup').post(authController.signupUser);

router.route('/forgot-password').post(authController.forgotPassword);
router.patch('/reset-password/:resetToken', authController.resetPassword);

router.use(authController.authenticateUser);

router
  .route('/verification')
  .post(
    authController.restrictAccessTo('business'),
    authController.verifyAccount
  );

router.route('/password-update').patch(authController.updateUserPassword);

router
  .route('/account-update')
  .patch(
    userController.uploadPhoto,
    userController.resizeAccountPhoto,
    userController.updateAccount
  );

module.exports = router;
