const express = require('express');
const jwtTokenVerification = require('../Middleware/jwtTokenVerification');
const ReadingListItemController = require('../Controllers/ReadingListItemController')
const Router = express.Router();

Router.route('/reading_list/:reading_list_id')
    .get(jwtTokenVerification, ReadingListItemController.getAllReadingListItem)

Router.route('/')
    .post(jwtTokenVerification, ReadingListItemController.addReadingListItem);

Router.route('/:reading_list_item_id')
    .get(jwtTokenVerification, ReadingListItemController.getSingleReadingListItem)
    .delete(jwtTokenVerification, ReadingListItemController.deleteReadingListItem);

module.exports = Router;