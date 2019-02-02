const mongoose = require('mongoose');

const Category = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true }
    },
    { strict: 'throw' }
);

module.exports = mongoose.model('Category', Category);
