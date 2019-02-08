const User = require('./user.db').schema;
const Category = require('./category.db').schema;
const mongoose = require('mongoose');

const Playlist = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        categories: {type: [Category]},
        links: [{type: String}],
        personal: {type: Boolean, required: true},
        subscribedBy: [{type: String}]
    },
    { strict: 'throw' }
);

module.exports = mongoose.model('Playlist', Playlist);
