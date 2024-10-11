const courseService = require('../services/InstructorService');


const instructorController={
    addCourse: async(req, res) =>{
        try {
            const { title, description,  price, category, certificates } = req.body;
            // const instructorId = req.user._id; // Assuming the instructor is logged in
            const instructorName = req.user.username

            const course = await courseService.createCourse({ title, description,  price, instructorName, category, certificates });
            res.status(201).json( course );
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    updateCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const {title, description,  price, category, certificates} = req.body;

            const updatedCourse = await courseService.updateCourse(courseId, {title, description,  price, category, certificates});
            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = instructorController;

// exports.addCourse = async (req, res) => {
//     try {
//         const { title, description, categoryId, price } = req.body;
//         const instructorId = req.user._id; // Assuming the instructor is logged in
//         const instructorName = req.user.username
//
//         const course = await courseService.createCourse({ title, description, categoryId, price, instructorId, instructorName });
//         res.status(201).json({ message: "Course created successfully", course });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to create course", error });
//     }
// };

// exports.addCourse = async (req, res) => {
//     try {
//         const { title, description, category,certificates, price } = req.body;
//         const instructorId = req.user._id;  // Assuming the instructor is logged in
//
//         // Create a course DTO
//         const courseDto = {
//             title,
//             description,
//             category,
//             certificates,
//             price,
//         };
//         // Call service to create the course
//         console.log("i got to controller")
//         const result = await courseService.createCourse(instructorId, courseDto);
//
//         console.log("Result: ",result);
//
//         res.status(201).json({
//             message: result.message,
//             courseId: result.courseId,  // Return the course ID
//             course: result.course,  // Return the full course object
//             instructorName: result.instructorName,  // Return the instructor's name
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create course', error });
//     }
// };

// exports.addCourse = async (req, res) => {
//     try {
//         // Destructure properties from req.body
//         const { title, description, category, certificates, price } = req.body;
//
//         // Check if the required fields are provided
//         if (!title || !description || !category || !certificates || !price) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//
//         // Create a course DTO
//         const courseDto = {
//             title,
//             description,
//             category,
//             certificates,
//             price,
//         };
//
//         // Call the service method to create the course
//         const result = await courseService.createCourse(courseDto);
//
//         res.status(201).json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to create course", error: error.message });
//     }
// };



// exports.updateCourse = async (req, res) => {
//     try {
//         const { courseId } = req.params;
//         const { title, description, categoryId, price } = req.body;
//
//         const updatedCourse = await courseService.updateCourse(courseId, { title, description, categoryId, price });
//         res.status(200).json({ message: "Course updated successfully", updatedCourse });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update course", error });
//     }
// };
//
// exports.deleteCourse = async (req, res) => {
//     try {
//         const { courseId } = req.params;
//         await courseService.deleteCourse(courseId);
//         res.status(200).json({ message: "Course deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to delete course", error });
//     }
// };
//
// exports.getCourses = async (req, res) => {
//     try {
//         const { courseId } = req.params;
//         const courses = await courseService.getInstructorCourses(courseId);
//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch courses", error });
//     }
// };
//
// exports.createCourseCategory = async (req, res) => {
//     try {
//         const { name, description } = req.body;
//         const category = await courseService.createCourseCategory({ name, description });
//         res.status(201).json({ message: "Course category created successfully", category });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to create course category", error });
//     }
// };
//
// exports.updateCourseCategory = async (req, res) => {
//     try {
//         const { categoryId } = req.params;
//         const { name, description } = req.body;
//         const updatedCategory = await courseService.updateCourseCategory(categoryId, { name, description });
//         res.status(200).json({ message: "Course category updated successfully", updatedCategory });
//     }catch (error){
//         res.status(500).json({ message: "Failed to update course category", error });
//     }
// };
//
// exports.deleteCourse = async(req, res) => {
//     try {
//         const { categoryId } = req.params;
//         await courseService.deleteCourseCategory(categoryId);
//         res.status(200).json({ message: "Course category deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to delete course category", error });
//     }
// }
