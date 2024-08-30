const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const VideoController = require('../Controllers/VideoController');
const router = express.Router();

router.route('/upload')
    .post(jwtTokenVerification, VideoController.postVideo);

router.route('/')
    .post(jwtTokenVerification, VideoController.getVideos);

router.route('/:video_id')
    .get(jwtTokenVerification, VideoController.getVideo)
    .delete(jwtTokenVerification, VideoController.deleteVideo);

module.exports = router;