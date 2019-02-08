const express = require('express');
const handler = require('./category.handlers');
const passport = require('passport');

const category = express.Router();

category.get('/categories/:name', passport.authenticate('jwt', { session: false }), handler.getCategories);

module.exports = category;
