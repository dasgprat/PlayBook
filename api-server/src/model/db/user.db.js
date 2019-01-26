const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        username: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: String, required: true, min: [1, 'Age must be greater than 1'] },
        contact: {
            email: { type: String, required: true }
        }
    },
    { strict: 'throw' }
);

module.exports = mongoose.model('User', User);
