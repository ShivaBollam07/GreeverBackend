const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const ReadingListController = require('../Controllers/ReadingListController');
const router = express.Router();

router.route('/')
    .get(jwtTokenVerification, ReadingListController.getAllReadingList)
    .post(jwtTokenVerification, ReadingListController.addReadingList);

router.route('/:_id')
    .get(jwtTokenVerification, ReadingListController.getSingleReadingList)
    .delete(jwtTokenVerification, ReadingListController.deleteReadingList);