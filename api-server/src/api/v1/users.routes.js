const express = require('express');
const handlers = require('./users.handlers');
const { authorize } = require('../../util/security');

const usersRouter = express.Router();

usersRouter.post('/users', handlers.addNewUser);
usersRouter.get('/users/:id', authorize, handlers.getUser);
usersRouter.patch('/users/:id', authorize, handlers.updateUser);
usersRouter.delete('/users/:id', authorize, handlers.deleteUser);
usersRouter.post('/users/:id/interests', authorize, handlers.addUserInterest);
usersRouter.delete('/users/:id/interests/:interest', authorize, handlers.removeUserInterest);
usersRouter.post('/users/:id/experience', authorize, handlers.addUserExperience);
usersRouter.delete('/users/:id/experience/:experience', authorize, handlers.removeUserExperience);

module.exports = usersRouter;
