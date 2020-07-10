const Order = require('../models/orderSchema');
const createError = require('http-errors');

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('book', '-__v');
        res.json({ success: true, orders: orders});
    }
    catch(err) {
        next(err);
    }
    
};

exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('book', '-__v');
        if (!order) throw createError(404);
        res.json({ success: true, order: order});
    }
    catch(err) {
        next(err);
    }
};

exports.postOrder = async (req, res, next) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json({ success: true, order: order});
    }
    catch(err) {
        next(err);
    }
};

exports.putOrder = async (req, res, next) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({ success: true, order: updateOrder });
    }
    catch(err) {
        next(err);
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) throw createError(404);
        res.json({ success: true, order: order });
    }
    catch(err) {
        next(err);
    }
};

