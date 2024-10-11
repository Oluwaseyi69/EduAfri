// const mongoose = require('mongoose');
//
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     oldPassword: {
//         type: String,
//         // required: true,
//     },
//     newPassword: {
//         type: String,
//         // required: true,
//     },
//     role: {
//         type: String,
//         enum: ['student', 'instructor'],
//         default: 'student',
//     },
// });
//
// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor'], required: true },
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
