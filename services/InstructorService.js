const CourseRepository = require('../repositories/CourseRepository');
const CourseCategoryRepository = require('../repositories/CourseCategoryRepository');
const CertificateRepository = require('../repositories/CertificateRepository');
const UserRepository = require('../repositories/UserRepository');
const mongoose = require('mongoose');

class InstructorService {
    // Create a new course
    async createCourse(courseDto) {
        console.log('Creating', courseDto)

        return await CourseRepository.create(courseDto);

    }

    // Update course details
    async updateCourse( courseId, updatedData) {
        const course = await CourseRepository.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }


        const updatedCourse = await CourseRepository.update(courseId, updatedData);
        return {
            message: 'Course updated successfully',
            updatedCourse,
        };
    }

    // Delete a course
    async deleteCourse(instructorId, courseId) {
        const course = await CourseRepository.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        if (course.instructor !== instructorId) {
            throw new Error("Only the instructor who created the course can delete it");
        }

        await CourseRepository.delete(courseId);
        return { message: 'Course deleted successfully' };
    }

    // Get all courses by an instructor
    async getInstructorCourses(instructorId) {
        return await CourseRepository.findByInstructor(instructorId);
    }

    // Create a new course category
    async createCourseCategory(categoryDto) {
        const category = {
            name: categoryDto.name,
            description: categoryDto.description,
        };

        await CourseCategoryRepository.create(category);
        return {
            message: 'Course category created successfully',
            category,
        };
    }

    // Update course category
    async updateCourseCategory(categoryId, updateFields) {
        const updatedCategory = await CourseCategoryRepository.update(categoryId, updateFields);
        return {
            message: 'Course category updated successfully',
            updatedCategory,
        };
    }

    // Delete a course category
    async deleteCourseCategory(categoryId) {
        await CourseCategoryRepository.delete(categoryId);
        return { message: 'Course category deleted successfully' };
    }

    async getAllCourses() {
        return await CourseRepository.findAll();
    }
    // Get a single course by ID
    async getCourse(courseId) {
        return await CourseRepository.findById(courseId);
    }
}

module.exports = new InstructorService();
