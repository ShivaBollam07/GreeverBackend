const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const EducationController = require('../Controllers/EducationController');
const router = express.Router();

router.route('/')
    .get(jwtTokenVerification,EducationController.getAllEducationForAUser)
    .post(jwtTokenVerification,EducationController.addEducation);

router.route('/:education_id')
    .get(jwtTokenVerification,EducationController.getSingleEducationbasedonUserIdandEducationId)
    .delete(jwtTokenVerification,EducationController.deleteEducation);


module.exports = router;