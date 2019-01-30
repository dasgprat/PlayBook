const uuid = require('uuid/v4');
const db = require('./db/playlist.db');
const errors = require('../util/error');
const logger = require('winstonson')(module);

class Playlist {
    constructor(props) {
        if (!props) props = {};
        this.id = props.id || props._id || uuid();
        this.username = props.username;
        this.name = props.name;
        this.author = props.author;
        this.description = props.description;
        this.categories = props.categories;
        this.links = props.links;
        this.personal = props.personal;
        this.subscribedBy = props.subscribedBy;
    }
}

function find(query) {
    q = {};
    return new Promise((resolve, reject) => {
        db.find({
            $or: [
                {_id: query.id},
                {username: query.username},
                {subscribedBy: query.username}
            ]
        })
            .lean()
            .exec((err, docs) => {
                if (err) return reject(errors.translate(err, 'retrieve playlist information'));
                logger.trace(JSON.stringify(docs, null, 4));
                return resolve(docs.map(doc => new Playlist(doc)));
            });
    });
}

module.exports = {
    Playlist,
    find
};
