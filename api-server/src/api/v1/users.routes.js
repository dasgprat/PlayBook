const express = require('express');
const handlers = require('./users.handlers');
const passport = require('passport');

const usersRouter = express.Router();

const authenticate = passport.authenticate('jwt', { session: false });

usersRouter.post('/users', handlers.addNewUser);
usersRouter.get('/users/:id', authenticate, handlers.getUser);
usersRouter.patch('/users/:id', authenticate, handlers.updateUser);
usersRouter.delete('/users/:id', authenticate, handlers.deleteUser);
usersRouter.post('/users/:id/interests', authenticate, handlers.addUserInterest);
usersRouter.delete('/users/:id/interests/:interest', authenticate, handlers.removeUserInterest);
usersRouter.post('/users/:id/experience', authenticate, handlers.addUserExperience);
usersRouter.delete('/users/:id/experience/:experience', authenticate, handlers.removeUserExperience);

module.exports = usersRouter;
