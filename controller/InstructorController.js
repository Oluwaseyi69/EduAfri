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
    },

    deleteCourse: async (req, res) => {
        try {
            const { courseId } = req.params;

            await courseService.deleteCourse(courseId);

            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = instructorController;


