const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const ExperienceController = require('../Controllers/ExperienceController');
const router = express.Router();

router.route('/')
    .get(jwtTokenVerification,ExperienceController.getAllExperienceForAUser)
    .post(jwtTokenVerification,ExperienceController.addExperience);

router.route('/:experience_id')
    .get(jwtTokenVerification,ExperienceController.getSingleExperiencebasedonUserIdandExperienceId)
    .delete(jwtTokenVerification,ExperienceController.deleteExperience);

module.exports = router;