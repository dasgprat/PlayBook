const Category = require('../../model/category.model');
const response = require('./response');
const status = require('http-status');
const logger = require('winstonson')(module);

module.exports = {
    mergeCategory,
    getCategories
};

async function mergeCategory(req, res) {
    try {
        if(!req.body.name) {
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing category name');
        }
        logger.trace(JSON.stringify(req.body));
        let category = await Category.merge(new Category.Category(req.body));
        return response.sendActionResponse(res, status.CREATED, 'Successfully created new category', category);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'add new category');
    }
}

async function getCategories(req, res) {
    try {
        logger.trace(`Retrieving categories for ${req.params.name}`);
        let categories = await Category.find({ name: req.params.name });
        return response.sendQueryResponse(res, status.OK, categories);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'retrieve categories');
    }
}
