const express = require('express');
const handlers = require('./auth.handlers');

const authRouter = express.Router();

authRouter.put('/auth', handlers.login);

module.exports = authRouter;
