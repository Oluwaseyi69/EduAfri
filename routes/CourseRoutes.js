
const express = require('express');
const authMiddleware = require('../middleware/Auth');
const courseController = require('../controller/InstructorController');

const router = express.Router();

router.post('/courses', authMiddleware.authenticate, courseController.addCourse);
router.put('/updateCourse/:courseId', authMiddleware.authenticate, courseController.updateCourse)
router.delete('/deleteCourse/:courseId', authMiddleware.authenticate, courseController.deleteCourse)

module.exports = router;
