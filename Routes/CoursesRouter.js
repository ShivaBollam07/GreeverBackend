const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const CoursesController = require('../Controllers/CoursesController');
const router = express.Router();

router.route('/Courses')
    .get(jwtTokenVerification, CoursesController.getCourses)
    .post(jwtTokenVerification, CoursesController.addCourse)
    .delete(jwtTokenVerification, CoursesController.deleteCourse)

router.route('/Courses/:id')
    .get(jwtTokenVerification, CoursesController.getCourse)

module.exports = router;
