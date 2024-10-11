const Enrollment = require('../models/Enrollment');

class EnrollmentRepository {
    async create(enrollment) {
        const newEnrollment = new Enrollment(enrollment);
        return await newEnrollment.save();
    }

    async findByStudent(studentId) {
        return Enrollment.find({student: studentId});
    }

    async findByCourse(courseId) {
        return Enrollment.find({course: courseId});
    }
}

module.exports = new EnrollmentRepository();
