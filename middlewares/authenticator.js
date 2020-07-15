const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userSchema');

exports.authToken = async (req, res, next) => {
    const token = req.cookies['x-auth'];
    if (!token) throw createError(403)
    
    jwt.verify(token, process.env.JWT_KEY, async (err, {_id}) => {
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

exports.authAdmin = async (req, res, next) => {
    const {role} = req.user;
    if (role !== 'Admin') next(createError(403));
    next();
}
