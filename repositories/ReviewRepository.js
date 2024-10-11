const Review = require('../models/Review');

class ReviewRepository {
    async create(review) {
        const newReview = new Review(review);
        return await newReview.save();
    }

    async findByCourse(courseId) {
        return Review.find({course: courseId});
    }
}

module.exports = new ReviewRepository();
