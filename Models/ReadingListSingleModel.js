const mongoose = require('mongoose');

const readingListItemSchema = new mongoose.Schema({
    reading_list_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReadingList',
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

const ReadingListItem = mongoose.model('ReadingListItem', readingListItemSchema);

module.exports = ReadingListItem;