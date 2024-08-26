const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const courseVideoSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: true
    },
    video_title: {
        type: String,
        required: true
    },
    video_description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    video_duration: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const CourseVideoModel = mongoose.model('CourseVideo', courseVideoSchema);

module.exports = CourseVideoModel;