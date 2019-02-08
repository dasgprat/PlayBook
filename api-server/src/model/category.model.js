const uuid = require('uuid/v4');
const db = require('./db/category.db');
const errors = require('../util/error');
const logger = require('winstonson')(module);

class Category {
    constructor(props) {
        if (!props) props = {};
        this.id = props.id || props._id || uuid();
        this.name = props.name;
    }
}

function merge(category) {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate({ _id: category.id }, category, { upsert: true, new: true })
            .lean()
            .exec((err, doc) => {
                if (err) return reject(errors.translate(err, 'save category'));
                logger.trace(JSON.stringify(doc, null, 4));
                if (!doc) {
                    return resolve(undefined);
                }
                return resolve(new Category(doc));
            });
    });
}

function find(query) {
    return new Promise((resolve, reject) => {
        db.find({
            name: {
                $regex: query.name,
                $options: "i"
            }
        })
            .lean()
            .exec((err, docs) => {
                if (err) return reject(errors.translate(err, 'retrieve categories'));
                logger.trace(JSON.stringify(docs, null, 4));
                return resolve(docs.map(doc => new Category(doc)));
            });
    });
}

module.exports = {
    Category,
    merge,
    find
};
