const User = require('../models/userSchema');
const createError = require('http-errors');


exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({ success: true, users: users});
    }
    catch(err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('orders', '-__v');
        if (!user) throw createError(500);
        const userData = user.getPublicFields();
        res.json({ success: true, user: userData});
    }
    catch(err) {
        next(err);
    }
};

exports.postUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ success: true, user: user});
    }
    catch(err) {
        next(err);
    }
};

exports.putUser = async (req, res, next) => {
    const id = req.params.id;
    const user = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, user, {new: true});
        if (!updateUser) throw createError(404);
        const userData = updateUser.getPublicFields();
        res.json({ success: true, user: userData });
    }
    catch(err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw createError(404);
        res.json({ success: true, user: user});
    }
    catch(err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        // Find user
        const user = await User.findOne({email}).populate('orders', '-__v');
        if (!user) throw createError(404);

        // Compare password
        const valid = await user.checkPassword(password);
        if (!valid) throw createError(403);

        // Authenticate
        const token = user.generateAuthToken();

        // Get Public Fields
        const userData = user.getPublicFields();

        res.cookie('x-auth', token);
        res.json({success: true, message: 'You are logged in!', user: userData});
    }
    catch (err) {
        next(err);
    }
    
};