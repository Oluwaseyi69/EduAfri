const Course = require('../models/CourseModel');

class CourseRepository {
    async create(course) {
        const newCourse = new Course(course);
        return newCourse.save();
    }

    async findById(courseId) {
        return Course.findById(courseId);
    }

    async findAll() {
        return await Course.find();
    }

    async update(courseId, updateFields) {
        return await Course.findByIdAndUpdate(courseId, updateFields, { new: true });
    }

    async delete(courseId) {
        return await Course.findByIdAndDelete(courseId);
    }

    async findByInstructor(instructorId) {
        return await Course.find({ instructor: instructorId });
    }
}

module.exports = new CourseRepository();
