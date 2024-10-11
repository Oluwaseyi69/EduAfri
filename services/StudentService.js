const CourseRepository = require('../repositories/CourseRepository');
const EnrollmentRepository = require('../repositories/EnrollmentRepository');
const ReviewRepository = require('../repositories/ReviewRepository');
const mongoose = require('mongoose');

class StudentService {

    async viewCourses (){
        return await CourseRepository.findAll();
    }
    // Enroll a student in a course
    async enrollCourse(courseId) {



        console.log("Enrolling", courseId);
        if (!courseId ) {
            throw new Error("Course ID and Student ID are required");
        }

        const course = await CourseRepository.findById(courseId);
        console.log(course)
        if (!course) {
            throw new Error("Course not found");
        }
        // Update the enrollment count
        course.enrollmentCount += 1;

        const enrollment = {

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
