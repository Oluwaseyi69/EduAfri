const CourseCategory = require('../models/CourseModel');

class CourseCategoryRepository {
    async create(category) {
        const newCategory = new CourseCategory(category);
        return await newCategory.save();
    }

    async update(categoryId, updateFields) {
        return CourseCategory.findByIdAndUpdate(categoryId, updateFields, {new: true});
    }

    async delete(categoryId) {
        return CourseCategory.findByIdAndDelete(categoryId);
    }
}

module.exports = new CourseCategoryRepository();
