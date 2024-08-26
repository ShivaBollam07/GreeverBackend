const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const CoursesController = require('../Controllers/CoursesController');
const router = express.Router();

router.route('/:_id')
    .get(jwtTokenVerification, CoursesController.getSingleCourse)
    .delete(jwtTokenVerification, CoursesController.deleteCourse);

router.route('/')
    .get(jwtTokenVerification, CoursesController.getCourses)
    .post(jwtTokenVerification, CoursesController.addCourse);

module.exports = router;
