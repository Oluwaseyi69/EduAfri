// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/Auth');
// const roleMiddleware = require('../middleware/Role');
// const StudentService = require('../services/StudentService');
//
// // Student enrolls in a course
// router.post(
//     '/courses/:courseId/enroll',
//     authMiddleware.authenticate,  // Authenticate first
//     (req, res, next) => {
//         const token = req.header('Authorization')?.replace('Bearer ', '');
//         return roleMiddleware.authorizeStudent(token)(req, res, next);
//     },
//     async (req, res) => {
//         try {
//             const result = await StudentService.enrollCourse(req.user._id, req.params.courseId);
//             res.status(200).json(result);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     }
// );
//
// // Student leaves a review for a course
// router.post(
//     '/courses/:courseId/review',
//     authMiddleware.authenticate,  // Authenticate first
//     (req, res, next) => {
//         const token = req.header('Authorization')?.replace('Bearer ', '');
//         return roleMiddleware.authorizeStudent(token)(req, res, next);
//     },
//     async (req, res) => {
//         try {
//             const result = await StudentService.addReview(req.user._id, req.params.courseId, req.body);
//             res.status(200).json(result);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     }
// );

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/Auth');
const roleMiddleware = require('../middleware/Role');
const StudentController = require('../controller/StudentController');

// Student enrolls in a course
router.post(
    '/courses/:courseId/enroll',
    authMiddleware.authenticate,  // Authenticate first
    (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        return roleMiddleware.authorizeStudent(token)(req, res, next);  // Authorize student role
    },
    StudentController.enrollCourse  // Call enrollCourse method
);

// Student leaves a review for a course
router.post(
    '/courses/:courseId/review',
    authMiddleware.authenticate,  // Authenticate first
    (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        return roleMiddleware.authorizeStudent(token)(req, res, next);  // Authorize student role
    },
    StudentController.leaveReview  // Call leaveReview method
);

// Get all enrolled courses for a student
router.get(
    '/courses/enrolled',
    authMiddleware.authenticate,  // Authenticate first
    (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        return roleMiddleware.authorizeStudent(token)(req, res, next);  // Authorize student role
    },
    StudentController.getEnrolledCourses  // Call getEnrolledCourses method
);

module.exports = router;

