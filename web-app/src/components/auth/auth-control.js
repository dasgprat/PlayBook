import api from '../api-gateway';

class AuthController {
    constructor() {
        this.isAuthenticated = false;
        this.url = null;
    }

    authenticate(username, password, cb) {
        api.put('/auth', { username, password }, (err, res) => {
            if (err) return cb(err);
            this.isAuthenticated = true;
            api.setToken(res.content.token);
            return cb(null, res);
        });
    }

    register(form, cb) {
        let user = {
            name: form.name,
            username: form.username,
            contact: { email: form.email },
            age: form.age,
            username: form.username,
            password: form.password
        };
        api.post('/users', user, (err, res) => {
            if (err) return cb(err);
            return this.authenticate(user.username, user.password, cb);
        });
    }

    verify(cb) {
        api.get('/auth', err => {
            if(err) cb(err);
            this.isAuthenticated = true;
            cb(null);
        });
    }
}

const controller = new AuthController();

export default controller;
