const mongoose = require('mongoose');

const Auth = new mongoose.Schema({
    _id: { type: String, required: true },
    user: { type: String, required: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    algo: { type: String, required: true },
    role: { type: String, required: true },
    last: { type: String, required: true }
});

module.exports = mongoose.model('Auth', Auth);
