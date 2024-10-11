const StudentService = require('../services/StudentService');
const authMiddleware = require('../middleware/Auth');
const roleMiddleware = require('../middleware/Role');

class StudentController {
    async viewCourses(req, res ){
        try {
            const foundCourses = await StudentService.viewCourses();  // Call StudentService
            res.status(200).json({
                message: 'Courses found',
                courses: foundCourses
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to find courses',
                error: error.message
            });
        }
    }

    // Enroll in a course
    async enrollCourse(req, res) {
        try {
            const { courseId } = req.params; // Assume courseId is sent in URL
            // const studentId = req.user._id;  // Extract student ID from authenticated user


            const result = await StudentService.enrollCourse(courseId);  // Call StudentService
            res.status(200).json({
                message: 'Successfully enrolled in the course',
                result
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to enroll in course',
                error: error.message
            });
        }
    }

    // Leave a review for a course
    async leaveReview(req, res) {
        try {
            const studentId = req.user._id;  // Extract student ID from authenticated user
            const courseId = req.params.courseId;  // Extract course ID from request params
            const reviewData = req.body;  // Extract review content from request body

            const result = await StudentService.addReview(studentId, courseId, reviewData);  // Call StudentService
            res.status(200).json({
                message: 'Review submitted successfully',
                result
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to submit review',
                error: error.message
            });
        }
    }

    // View all enrolled courses
    async getEnrolledCourses(req, res) {
        try {
            const studentId = req.user._id;  // Extract student ID from authenticated user

            const courses = await StudentService.getEnrolledCourses(studentId);  // Call StudentService
            res.status(200).json({
                message: 'Enrolled courses retrieved successfully',
                courses
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to retrieve enrolled courses',
                error: error.message
            });
        }
    }
}

module.exports = new StudentController();
