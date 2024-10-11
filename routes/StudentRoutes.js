
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/Auth');
const roleMiddleware = require('../middleware/Role');
const StudentController = require('../controller/StudentController');

// Student enrolls in a course
router.get('/viewCourses', authMiddleware.authenticate, StudentController.viewCourses);
router.post('/courses/enroll/:courseId', authMiddleware.authenticate, StudentController.enrollCourse);
router.post('/courses/review/:courseId', authMiddleware.authenticate, StudentController.leaveReview);
module.exports = router;

