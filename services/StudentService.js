const CourseRepository = require('../repositories/CourseRepository');
const EnrollmentRepository = require('../repositories/EnrollmentRepository');
const ReviewRepository = require('../repositories/ReviewRepository');

class StudentService {
    // Enroll a student in a course
    async enrollCourse(studentId, courseId) {
        const course = await CourseRepository.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const enrollment = {
            student: studentId,
            course: courseId,
        };

        await EnrollmentRepository.create(enrollment);
        return {
            message: 'Student enrolled successfully',
            course: course.title,
        };
    }

    // Add a review for a course
    async addReview(studentId, courseId, reviewDto) {
        const course = await CourseRepository.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const review = {
            student: studentId,
            course: courseId,
            rating: reviewDto.rating,
            comment: reviewDto.comment,
        };

        await ReviewRepository.create(review);
        return {
            message: 'Review added successfully',
            review,
        };
    }

    // Get all reviews for a course
    async getCourseReviews(courseId) {
        const reviews = await ReviewRepository.findByCourse(courseId);
        return reviews;
    }

    // Get all enrolled courses for a student
    async getEnrolledCourses(studentId) {
        const enrollments = await EnrollmentRepository.findByStudent(studentId);
        return enrollments.map(enrollment => ({
            id: enrollment.course,
            title: CourseRepository.findById(enrollment.course).title,
        }));
    }
}

module.exports = new StudentService();
