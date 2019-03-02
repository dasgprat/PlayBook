class UserModel {
    constructor() {
        this._user = {
            id: null,
            username: null,
            name: null,
            age: null,
            contact: {
                email: null
            },
            skills: {
                interested: [],
                experienced: []
            },
            gender: null,
            image: null,
            about: null,
            playbooks: [],
            subscriptions: []
        };
        this._default = Object.assign({}, this._user);
    }

    update(user) {
        this._user = Object.assign({}, this._user, user);
        if (this._user._id) {
            this._user.id = this._user._id;
            delete this._user._id;
        }
    }

    reset() {
        this.update(this._default);
    }

    get() {
        return this._user;
    }
}

const model = new UserModel();

export default model;
