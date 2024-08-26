const { getDB } = require('../Config/MongoConfig');
const { ObjectId } = require('mongodb');

const CoursesController = {
    getCourses: async (req, res) => {
        try {
            const db = getDB();
            const courses = await db.collection('courses').find().toArray();
            if (courses.length === 0) {
                return res.status(404).json({ error: 'No courses found.', 'StatusCode': 404 });
            }
            else {
                res.json({ 'status': 'success', 'data': courses, 'message': 'Courses fetched successfully.', 'StatusCode': 200 });
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.json({ 'status': 'failed', error: 'Failed to fetch courses.', 'StatusCode': 500 });
        }
    },
    getSingleCourse: async (req, res) => {
        try {
            const db = getDB();
            const courseId = req.params._id;
            if (!courseId) {
                return res.json({ 'status': 'failed', error: 'Course ID is required.','message' : 'Cant get course' , 'StatusCode': 400 });
            }
            const course = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });
            if (!course) {
                return res.json({ 'status': 'failed', error: 'Course not found.', 'StatusCode': 404 });
            }
            res.json({ 'status': 'success', 'data': course, 'message': 'Course fetched successfully.', 'StatusCode': 200 });
        } catch (error) {
            console.error('Error fetching course:', error);
            res.json({ 'status': 'failed', error: 'Failed to fetch course.', 'StatusCode': 500 })
        }
    },
    addCourse: async (req, res) => {
        try {
            const { course_title, course_description, course_duration, course_image, course_banner } = req.body;

            if (!course_title || !course_description || !course_duration || !course_image || !course_banner) {
                return res.json({ 'status': 'failed', error: 'All fields are required.', 'StatusCode': 400 });
            }

            const newCourse = {
                course_title,
                course_description,
                course_duration,
                course_image,
                course_banner
            };

            const db = getDB();
            const result = await db.collection('courses').insertOne(newCourse);

            return res.json({
                message: 'Course added successfully.',
                course: {
                    _id: result.insertedId,
                    ...newCourse
                },
                'status': 'success',
                'StatusCode': 201
            });
        } catch (error) {
            console.error('Error adding course:', error);
            return res.json({ 'status': 'failed', error: 'Failed to add course.', 'StatusCode': 500 });
        }
    },
    deleteCourse: async (req, res) => {
        try {
            const db = getDB();
            const result = await db.collection('courses').deleteOne({ course_id: req.params.course_id });
            if (result.deletedCount === 0) {
                return res.json({ 'status': 'failed', error: 'Course not found.', 'StatusCode': 404 });
            }
            res.json({ 'status': 'success', 'message': 'Course deleted successfully.', 'StatusCode': 200 });
        } catch (error) {
            console.error('Error deleting course:', error);
            res.json({ 'status': 'failed', error: 'Failed to delete course.', 'StatusCode': 500 });
        }
    }
};

module.exports = CoursesController;
