const AuthModel = require('../../model/auth.model');
const UserModel = require('../../model/user.model');
const response = require('./response');
const status = require('http-status');
const crypto = require('crypto');
const logger = require('winstonson')(module);
const authToken = require('../../util/auth-token');

module.exports = {
    login,
    hash
};

function hash(algo, salt, password) {
    return crypto
        .createHash(algo)
        .update(salt)
        .update(password)
        .digest('hex');
}

async function login(req, res) {
    try {
        if (!req.body.username || !req.body.password)
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing username and/or password');
        let user = await UserModel.find({ username: req.body.username });
        if (!user) return response.sendErrorResponse(res, status.NOT_FOUND, 'Failed to find user to authenticate');
        let authInfo = await AuthModel.find({ user: user.id });
        if (!authInfo) return response.sendErrorResponse(res, status.NOT_FOUND, 'Failed to find auth info for user');
        let hashed = hash(authInfo.algo, authInfo.salt, req.body.password);
        if (hashed != authInfo.hash) {
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Failed to authenticate with bad password');
        }
        // Authentication succeeded, generate a token and return it to the user
        let token = await authToken.generate(req.body.username);
        return response.sendActionResponse(res, status.OK, 'Successfully authenticated user', { token });
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'authenticate user');
    }
}
