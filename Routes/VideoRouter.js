const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const VideoController = require('../Controllers/VideoController');
const router = express.Router();

router.route('/')
    .get(jwtTokenVerification, VideoController.getVideos)
    .post(jwtTokenVerification, VideoController.postVideo);

router.route('/:video_id')
    .get(jwtTokenVerification, VideoController.getVideo)
    .delete(jwtTokenVerification, VideoController.deleteVideo);

module.exports = router;