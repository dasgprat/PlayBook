const UserModel = require('../../model/user.model');
const AuthModel = require('../../model/auth.model');
const response = require('./response');
const status = require('http-status');
const logger = require('winstonson')(module);
const crypto = require('crypto');
const config = require('config');
const _config = config.get('security');
const verify = require('../../email/verification');
const security = require('../../util/security');

module.exports = {
    getUser,
    addNewUser,
    updateUser,
    deleteUser,
    addUserInterest,
    removeUserInterest,
    addUserExperience,
    removeUserExperience,
    generateUserResponse
};

function generateResourceUrl(user) {
    return `http://localhost:8080/api/v1/users/${user.id}`;
}

function generateUserResponse(user) {
    let self = generateResourceUrl(user);
    return {
        ...user,
        _links: {
            self
        }
    };
}

async function addNewUser(req, res) {
    try {
        if (!req.body.username || !req.body.password) {
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing username and/or password');
        }
        logger.trace('Verifying user does not already exist');
        let user = await UserModel.find({ username: req.body.username });
        if (user !== undefined) {
            return response.sendActionResponse(
                res,
                status.CONFLICT,
                'User with provided username already exists',
                user
            );
        }
        logger.trace('Adding new user with username ' + req.body.username);
        user = await UserModel.merge(new UserModel.User(req.body));
        logger.trace('Added user. Generating authentication entry');
        let salt = crypto.randomBytes(8).toString('hex');
        let algo = _config.hashAlgo;
        let h = security.hash(algo, salt, req.body.password);
        await AuthModel.merge(new AuthModel.AuthInfo({ user: user.id, salt, algo, hash: h }));
        // Send the verification email
        verify.sendVerificationRequest(user.name, user.contact.email, 'https://google.com', err => {
            if (err) logger.error(err);
        });
        logger.trace('Authentication entry added. Preparing response');
        let body = generateUserResponse(user);
        return response.sendActionResponse(res, status.CREATED, 'Successfully created new user', body);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'add new user');
    }
}

async function getUser(req, res) {
    try {
        logger.trace('Retrieving user');
        let user = await UserModel.find({ id: req.params.id });
        let body = generateUserResponse(user);
        return response.sendQueryResponse(res, status.OK, body);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'retrieve user');
    }
}

async function updateUser(req, res) {
    try {
        logger.trace('Updating user information for user ' + req.params.id);
        // Get the user
        let user = await UserModel.find({ id: req.params.id });
        if (!user) return response.sendErrorResponse(res, status.NOT_FOUND, 'Failed to find user to update');

        // Add the profile information
        if (req.body.username) user.username = req.body.username;
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.contact.email = req.body.email;
        if (req.body.experienced) user.skills.experienced = req.body.experienced;
        if (req.body.interested) user.skills.interested = req.body.interested;
        if (req.body.about) user.about = req.body.about;
        if (req.body.gender) user.gender = req.body.gender;
        // TODO: support changing password

        await UserModel.merge(user);

        logger.trace('User updated. Preparing and sending response');
        let body = generateUserResponse(user);
        return response.sendActionResponse(res, status.OK, 'Successfully saved user', body);
    } catch (err) {
        return response.sendErrorResponse(res, err, 'save user');
    }
}

async function deleteUser(req, res) {
    try {
        logger.trace('Removing user ' + req.params.id);
        let removed = await UserModel.remove({ id: req.params.id });
        if (!removed) {
            logger.warn('Failed to remove user: could not find user with id ' + req.params.id);
            return response.sendActionResponse(res, status.NOT_FOUND, 'Failed to find user to remove');
        }
        logger.trace('Removed user');
        return response.sendActionResponse(res, status.OK, 'Successfully removed user');
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'remove user');
    }
}

async function addUserInterest(req, res) {
    try {
        if (!req.body.interest)
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing interest in request body');
        let user = await UserModel.addUserInterest(req.params.id, req.body.interest);
        return response.sendActionResponse(res, status.CREATED, 'Successfully added interest', user.skills.interested);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(re.err, 'add user interest');
    }
}

async function removeUserInterest(req, res) {
    try {
        let user = await UserModel.removeUserInterest(req.params.id, req.params.interest);
        return response.sendActionResponse(res, status.OK, 'Successfully removed interest', user.skills.interested);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(re.err, 'remove user interest');
    }
}

async function addUserExperience(req, res) {
    try {
        if (!req.body.experience)
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing experience in request body');
        let user = await UserModel.addUserExperience(req.params.id, req.body.experience);
        return response.sendActionResponse(
            res,
            status.CREATED,
            'Successfully added experience',
            user.skills.experienced
        );
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(re.err, 'add user experience');
    }
}

async function removeUserExperience(req, res) {
    try {
        let user = await UserModel.removeUserExperience(req.params.id, req.params.experience);
        return response.sendActionResponse(res, status.OK, 'Successfully removed experience', user.skills.experienced);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'remove user experience');
    }
}
