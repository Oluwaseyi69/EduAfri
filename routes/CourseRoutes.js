// const express = require('express');
// const authMiddleware = require('../middleware/Auth');
// const roleMiddleware = require('../middleware/Role');
// const courseController = require('../controller/InstructorController');
//
// const router = express.Router();
//
//
// // Instructor creates a course
// router.post(
//     '/courses',
//     authMiddleware.authenticate,  // Authenticate first
//     roleMiddleware.authorizeInstructor, courseController.addCourse
// );
//
// // Instructor updates a course
// router.put(
//     '/courses/:courseId',
//     authMiddleware.authenticate,  // Authenticate first
//     roleMiddleware.authorizeInstructor, courseController.updateCourse
// );
//
// // Instructor deletes a course
// router.delete(
//     '/courses/:courseId',
//     authMiddleware.authenticate,  // Authenticate first
//     roleMiddleware.authorizeInstructor, courseController.updateCourse
// );
//
// // Get all courses (students or instructors can access)
// router.get(
//     '/courses',
//     authMiddleware.authenticate,  // Authenticate first
//     roleMiddleware.authorizeInstructor, courseController.getCourses
// );

// Get course details
// router.get(
//     '/courses/:courseId',
//     authMiddleware.authenticate,  // Authenticate first
//     async (req, res) => {
//         try {
//             const course = await CourseService.getCourse(req.params.courseId);
//             res.status(200).json(course);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     }
// );

// CourseRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/Auth');
const roleMiddleware = require('../middleware/Role');
const CourseService = require('../services/InstructorService');
const courseController = require('../controller/InstructorController');

const router = express.Router();

router.post('/courses', authMiddleware.authenticate, courseController.addCourse);
router.put('/updateCourse/:courseId', authMiddleware.authenticate, courseController.updateCourse)

module.exports = router; // Ensure this exports the router
