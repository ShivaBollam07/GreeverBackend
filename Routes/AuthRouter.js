const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');

router.route('/login')
    .post(AuthController.Login);

router.route('/signup')
    .post(AuthController.SignUp);

router.route('/verify-otp')
    .post(AuthController.OTPVerification);

router.route('/forgot-password')
    .put(jwtTokenVerification, AuthController.ForgotPassword);

router.route('/getname')
    .post(jwtTokenVerification, AuthController.GetName);

module.exports = router;