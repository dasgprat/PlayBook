const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        username: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, required: true, min: [1, 'Age must be greater than 1'] },
        contact: {
            email: { type: String, required: true }
        },
        skills: {
            interested: [String],
            experienced: [String]
        },
        about: String,
        gender: { type: String, enum: ['male', 'female', 'other'], default: null },
        image: String
    },
    { strict: 'throw' }
);

module.exports = mongoose.model('User', User);
