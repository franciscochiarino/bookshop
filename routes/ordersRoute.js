const Router = require('express').Router();
const {getOrders, getOrder, postOrder, putOrder, deleteOrder} = require('../controllers/ordersController');

Router.get('/', getOrders);
Router.get('/:id', getOrder);
Router.post('/', postOrder);
Router.put('/:id', putOrder);
Router.delete('/:id', deleteOrder);

module.exports = Router;