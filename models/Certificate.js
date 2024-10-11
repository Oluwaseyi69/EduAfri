const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    certificateUrl: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    issuedBy: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
