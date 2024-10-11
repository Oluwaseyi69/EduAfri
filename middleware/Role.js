// const CourseRepository = require('../repositories/CourseRepository')
//
// const roleMiddleware = {
//     // Ensure that the user is an instructor
//     authorizeInstructor: (req, res, next) => {
//         if (req.user.role !== 'instructor') {
//             return res.status(403).send({ error: 'Access denied. Instructor role required.' });
//         }
//         next();
//     },
//
//     // Ensure that the user is a student
//     authorizeStudent: (req, res, next) => {
//         if (req.user.role !== 'student') {
//             return res.status(403).send({ error: 'Access denied. Student role required.' });
//         }
//         next();
//     },
//
//     // Ensure the instructor is the owner of the course (for update/delete)
//     authorizeCourseOwner: async (req, res, next) => {
//         try {
//             const course = await CourseRepository.findById(req.params.courseId);
//             if (!course) {
//                 return res.status(404).send({ error: 'Course not found' });
//             }
//             if (course.instructor.toString() !== req.user._id.toString()) {
//                 return res.status(403).send({ error: 'You can only manage your own courses.' });
//             }
//             next();
//         } catch (error) {
//             return res.status(500).send({ error: 'Internal server error.' });
//         }
//     }
// };
//
// module.exports = roleMiddleware;

const jwtUtil = require('../utils/JwtUtil');

const roleMiddleware = {
    authorizeInstructor: (token) => async (req, res, next) => {
        try {
            // Verify token and extract role
            const decoded = jwtUtil.verifyToken(token);

            if (decoded.role !== 'instructor') {
                return res.status(403).send({ error: 'Access denied. Instructor role required.' });
            }

            // Attach decoded user to the request
            req.user = decoded;

            next();
        } catch (error) {
            return res.status(403).send({ error: 'Unauthorized or invalid token' });
        }
    },

    authorizeStudent: (token) => async (req, res, next) => {
        try {
            const decoded = jwtUtil.verifyToken(token);

            if (decoded.role !== 'student') {
                return res.status(403).send({ error: 'Access denied. Student role required.' });
            }

            req.user = decoded;

            next();
        } catch (error) {
            return res.status(403).send({ error: 'Unauthorized or invalid token' });
        }
    },
};

module.exports = roleMiddleware;

