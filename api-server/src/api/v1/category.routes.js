const express = require('express');
const handler = require('./category.handlers');
const { authorize } = require('../../util/security');

const category = express.Router();

category.get('/categories/:name', authorize, handler.getCategories);

module.exports = category;
