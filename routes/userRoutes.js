const express = require('express');

const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/login').post(authController.loginUser);

router.route('/signup').post(authController.signupUser);

router.route('/forgot-password').post(authController.forgotPassword);
router.patch('/reset-password/:resetToken', authController.resetPassword);

module.exports = router;
