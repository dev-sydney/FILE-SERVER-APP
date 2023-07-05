const express = require('express');
const rateLimit = require('express-rate-limit');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 4,
  message:
    "You've exceeded the amount of requests allowed to the server, try again in the next hour",
});
router.route('/logout').get(authController.logoutUser);

router
  .route('/')
  .get(
    authController.authenticateUser,
    authController.restrictAccessTo('admin'),
    userController.getAllUsers
  );

router
  .route('/:user_id')
  .get(
    authController.authenticateUser,
    authController.restrictAccessTo('admin', 'business'),
    userController.getUser
  );
router.route('/login').post(limiter, authController.loginUser);

router.route('/signup').post(authController.signupUser);

router.route('/forgot-password').post(limiter, authController.forgotPassword);
router
  .route('/reset-password/:resetToken')
  .patch(limiter, authController.resetPassword);

router.route('/verification').post(authController.verifyAccount);

router.use(authController.authenticateUser);

router
  .route('/password-update')
  .patch(limiter, authController.updateUserPassword);

router
  .route('/account-update')
  .patch(
    userController.uploadPhoto,
    userController.resizeAccountPhoto,
    userController.updateAccount
  );

module.exports = router;
