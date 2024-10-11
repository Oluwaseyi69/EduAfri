const CourseRepository = require('../repositories/CourseRepository');
const EnrollmentRepository = require('../repositories/EnrollmentRepository');
const ReviewRepository = require('../repositories/ReviewRepository');
const UserRepository = require('../repositories/UserRepository');
const mongoose = require('mongoose');

class StudentService {

    async viewCourses (){
        return await CourseRepository.findAll();
    }
    // Enroll a student in a course
    async enrollCourse(courseId, studentEmail) {



        console.log("Enrolling", courseId);
        if (!courseId ) {
            throw new Error("Course ID and Student ID are required");
        }
        const course = await CourseRepository.findById(courseId);
        console.log(course)
        if (!course) {
            throw new Error("Course not found");
        }

        const student = await UserRepository.findByEmail(studentEmail);
        if (!student) {
            throw new Error("Student not found");
        }
        // Check if the student is already enrolled in this course
        if (student.enrolledCourses.includes(courseId)) {
            throw new Error("Student already enrolled in this course");
        }

        // Add the course to the student's enrolledCourses list
        student.enrolledCourses.push(courseId);
        await student.save(); // Save the updated student record

        // Add the student to the course's enrolledStudents list and increment student count
        course.enrolledStudents.push(student._id);
        course.studentCount += 1;
        await course.save(); // Save the updated course record


        // Update the enrollment count
        course.enrollmentCount += 1;

        const enrollment = {

            course: courseId,
        };

        // await EnrollmentRepository.create(enrollment);
        return {
            message: 'Student enrolled successfully',
            course: course.title,
        };
    }

    // Add a review for a course
    async addReview(studentEmail, courseId, reviewDto) {
        try {
            // Find the student by email
            const student = await UserRepository.findByEmail( studentEmail);
            if (!student) {
                throw new Error("Student not found");
            }

            // Find the course by course ID
            const course = await CourseRepository.findById(courseId);
            if (!course) {
                throw new Error("Course not found");
            }

            // Check if the student is enrolled in the course
            if (!course.enrolledStudents.includes(student._id)) {
                throw new Error("Student must be enrolled in the course to submit a review");
            }

            // Create the review object
            const newReview = {
                student: student._id,
                rating: reviewDto.rating,
                comment: reviewDto.comment
            };

            // Add the review to the course's reviews array
            course.reviews.push(newReview);

            // Recalculate the average rating
            const totalRating = course.reviews.reduce((sum, review) => sum + review.rating, 0);
            course.rating = totalRating / course.reviews.length;

            // Save the updated course
            await course.save();

            return {
                message: 'Review submitted successfully',
                courseTitle: course.title,
                studentName: student.username,
                rating: reviewDto.rating,
                comment: reviewDto.comment
            };
        } catch (error) {
            throw new Error(`Failed to submit review: ${error.message}`);
        }
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
