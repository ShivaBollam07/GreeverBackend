const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController.js');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');

router.route('/details')
    .get(jwtTokenVerification, UserController.GetUserDetails)
    .post(jwtTokenVerification, UserController.PostUserDetails)
    .put(jwtTokenVerification, UserController.UpdateUserDetails);


module.exports = router;