const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const courseSchema = new mongoose.Schema({
    course_title: {
        type: String,
        required: true
    },
    course_description: {
        type: String
    },
    course_duration: {
        type: String
    },
    course_image: {
        type: String
    },
    course_banner: {
        type: String
    }
}, { timestamps: true });

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;