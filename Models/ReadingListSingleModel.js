const mongoose = require('mongoose');

const ReadingListItem = new mongoose.Schema({
    reading_list_id: {
        type: String,
        required: true
    },
    reading_list_item_title: {
        type: String,
        required: true
    },
    reading_list_item_description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ReadingListItemModel = mongoose.model('ReadingListItem', ReadingListItem);

module.exports = ReadingListItemModel;