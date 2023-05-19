const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'fullname not provided '],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['normal', 'admin'],
        required: [true, 'Please specify user role'],
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
