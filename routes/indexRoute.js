const Router = require('express').Router();
const {getHomepage} = require('../controllers/indexController');

// Home
Router.get('/', getHomepage);

module.exports = Router;