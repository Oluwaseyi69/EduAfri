const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who wrote the review
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
    comment: { type: String, required: true }, // Review comment
    createdAt: { type: Date, default: Date.now } // Timestamp for when the review was submitted
});


const courseSchema = new Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    rating: {
        type: Number,
        default: 0
    },

    instructorName: {
        type: String,
        ref: 'User',
        // required: true
    },
    category: {
        type: String,
        ref: 'category',
        // required: true
    },
    reviews: [reviewSchema], // Array of reviews

    certificates:{
        type: String,
        ref: 'certificates',
    },
    enrollmentCount: {
        type: Number,
        default: 0,
    },
    enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const courseSchema = new Schema({
//     title: {
//         type: String,
//         // required: true
//     },
//     description: { type: String, required: true },
//     instructor: {
//         type: Schema.Types.ObjectId,
//         ref: 'User', // Reference to User model
//         required: true
//     },
//     category: { type: Schema.Types.ObjectId, ref: 'CourseCategory', required: true },
//     certificates: [{ type: Schema.Types.ObjectId, ref: 'Certificate' }],
//     price: { type: Number, required: true },
// }, { timestamps: true });
//


module.exports = mongoose.model('Course', courseSchema);
