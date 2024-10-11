const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    reviews: {
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

    certificates:{
        type: String,
        ref: 'certificates',
    },
    enrollmentCount: {
        type: Number,
        default: 0,
    },
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
