const mongoose = require('mongoose');

const ReadingList = new mongoose.Schema({
    reading_list_title: {
        type: String,
        required: true
    },
    reading_list_description:{
        type: String,
        required: true
    },
    reading_list_skills:{
        type :String,
        required: true
    },
    reading_list_image:{
        type: String,
        required: true
    },
    reading_list_banner:{
        type: String,
        required: true
    }
}, { timestamps: true });

const ReadingModel = mongoose.model('Reading', ReadingList);

module.exports = ReadingModel;