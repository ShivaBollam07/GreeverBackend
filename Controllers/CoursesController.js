const CoursesController = {
    getCourses: (req, res) => {
        res.send('Get all courses');
    },
    getCourse: (req, res) => {
        res.send('Get a course');
    },
    addCourse: (req, res) => {
        res.send('Add a course');
    },
   
    deleteCourse: (req, res) => {
        res.send('Delete a course');
    }
}

module.exports = CoursesController;
