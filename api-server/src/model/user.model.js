const uuid = require('uuid/v4');
const db = require('./db/user.db');
const errors = require('../util/error');

class User {
    constructor(props) {
        if (!props) props = {};
        this.id = props.id || props._id || uuid();
        this.username = props.username;
        this.name = props.name;
        this.age = props.age;
        this.contact = {
            email: props.contact !== undefined ? props.contact.email : undefined
        };
        this.skills = {
            interested: props.skills ? props.skills.interested || [] : [],
            experienced: props.skills ? props.skills.experienced || [] : []
        };
        this.gender = props.gender || null;
        this.image = props.image || null;
    }

    addInterest(skill) {
        this.skills.interested.push(skill);
    }

    addExperience(skill) {
        this.skills.experienced.push(skill);
    }

    removeInterest(skill) {
        this.skills.interested = this.skills.interested.filter(s => s !== skill);
    }

    removeExperience(skill) {
        this.skills.experienced = this.skills.experienced.filter(s => s !== skill);
    }
}

function addUserExperience(id, skill) {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate({ _id: id }, { $push: { 'skills.experienced': skill } })
            .lean()
            .exec((err, docs) => {
                if (err) return reject(errors.translate(err, 'add user experience'));
                if (!doc) {
                    return resolve(undefined);
                }
                return resolve(new User(doc));
            });
    });
}

function addUserInterest(id, skill) {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate({ _id: id }, { $push: { 'skills.interested': skill } })
            .lean()
            .exec((err, docs) => {
                if (err) return reject(errors.translate(err, 'add user experience'));
                if (!doc) {
                    return resolve(undefined);
                }
                return resolve(new User(doc));
            });
    });
}

function merge(user) {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate({ _id: user.id }, user, { upsert: true, new: true })
            .lean()
            .exec((err, doc) => {
                if (err) return reject(errors.translate(err, 'save user'));
                if (!doc) {
                    return resolve(undefined);
                }
                return resolve(new User(doc));
            });
    });
}

function find(query) {
    q = {};
    if (query && query.id) {
        q._id = query.id;
    }
    if (query && query.username) {
        q.username = query.username;
    }
    return new Promise((resolve, reject) => {
        db.find(q)
            .lean()
            .exec((err, docs) => {
                if (err) return reject(errors.translate(err, 'retrieve user information'));
                if (!docs || docs.length === 0) {
                    return resolve(undefined);
                }
                if (docs.length == 1) {
                    return resolve(new User(docs[0]));
                }
                return resolve(docs.map(doc => new User(doc)));
            });
    });
}

function removeUserExperience(id, skill) {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate({ _id: id }, { $pull: { 'skills.experienced': skill } })
            .lean()
            .exec((err, docs) => {
                if (err) return reject(errors.translate(err, 'add user experience'));
                if (!doc) {
                    return resolve(undefined);
                }
                return resolve(new User(doc));
            });
    });
}

function removeUserInterest(id, skill) {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate({ _id: id }, { $pull: { 'skills.interested': skill } })
            .lean()
            .exec((err, docs) => {
                if (err) return reject(errors.translate(err, 'add user experience'));
                if (!doc) {
                    return resolve(undefined);
                }
                return resolve(new User(doc));
            });
    });
}

function remove(query) {
    let q = {};
    if (query.id) {
        q._id = query.id;
    }
    return new Promise((resolve, reject) => {
        db.deleteMany(q)
            .lean()
            .exec((err, result) => {
                if (err) return reject(errors.translate(err, 'remove user information'));
                if (result && result.n === 0) {
                    return resolve(false);
                }
                return resolve(true);
            });
    });
}

module.exports = {
    User,
    merge,
    find,
    remove,
    addUserInterest,
    addUserExperience,
    removeUserExperience,
    removeUserInterest
};
