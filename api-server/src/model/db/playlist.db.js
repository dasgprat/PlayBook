const mongoose = require('mongoose');

const Playlist = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        author: { type: String, ref: 'User', required: true },
        description: { type: String, required: true },
        categories: [{ type: String, ref: 'Category' }],
        links: [{ type: String }],
        personal: { type: Boolean, required: true },
        subscribedBy: [{ type: String, ref: 'User' }],
        likedBy: [{ type: String, ref: 'User' }]
    },
    { strict: 'throw' }
);

module.exports = mongoose.model('Playlist', Playlist);
