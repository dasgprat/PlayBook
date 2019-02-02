const express = require('express');
const handler = require('./category.handlers');
const passport = require('passport');

const category = express.Router();

category.post('/categories/', passport.authenticate('jwt', { session: false }), handler.mergeCategory);
category.get('/categories/', passport.authenticate('jwt', { session: false }), handler.getCategories);

module.exports = category;
