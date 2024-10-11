const courseService = require('../services/CourseService');

exports.addCourse = async (req, res) => {
    try {
        const { title, description, categoryId, price } = req.body;
        const instructorId = req.user._id; // Assuming the instructor is logged in

        const course = await courseService.createCourse({ title, description, categoryId, price, instructorId });
        res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        res.status(500).json({ message: "Failed to create course", error });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, categoryId, price } = req.body;

        const updatedCourse = await courseService.updateCourse(courseId, { title, description, categoryId, price });
        res.status(200).json({ message: "Course updated successfully", updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Failed to update course", error });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await courseService.deleteCourse(courseId);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course", error });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const { courseId } = req.params;
        const courses = await courseService.getInstructorCourses(courseId);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses", error });
    }
};

exports.createCourseCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await courseService.createCourseCategory({ name, description });
        res.status(201).json({ message: "Course category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Failed to create course category", error });
    }
};

exports.updateCourseCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await courseService.updateCourseCategory(categoryId, { name, description });
        res.status(200).json({ message: "Course category updated successfully", updatedCategory });
    }catch (error){
        res.status(500).json({ message: "Failed to update course category", error });
    }
};

exports.deleteCourse = async(req, res) => {
    try {
        const { categoryId } = req.params;
        await courseService.deleteCourseCategory(categoryId);
        res.status(200).json({ message: "Course category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course category", error });
    }
}
