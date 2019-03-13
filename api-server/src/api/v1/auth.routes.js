const express = require('express');
const { authorize } = require('../../util/security');
const handlers = require('./auth.handlers');

const authRouter = express.Router();

authRouter.get('/auth', authorize, handlers.verifyAuthorized);
authRouter.put('/auth', handlers.login);

module.exports = authRouter;
