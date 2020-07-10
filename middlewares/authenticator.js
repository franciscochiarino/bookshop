const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userSchema');

exports.authToken = (req, res, next) => {
    const token = req.header('x-auth');
    
    jwt.verify(token, 'secretkey', async (err, {_id}) => {
        try {
            if (err) throw createError(403);
            const user = await User.findById(_id)
            req.user = user;
            next();
        }
        catch(err) {
            next(err)
        }
    })
}

exports.authAdmin = (req, res, next) => {
    const {role} = req.user;
    if (role !== 'Admin') next(createError(403));
    next();
}
