const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./addressSchema');
const {encrypt, compare} = require('../lib/encryption');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    // address: AddressSchema,
    password: {type: String, required: true},
    orders: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Order'}
    ],
    role: {type: String, enum: ['Admin', 'User'], default: 'User'},
    tokens: [
        {
            token: {type: String, require: true}
        }
    ]
},
{
    toObject: {
        virtuals: true
    }
});

UserSchema.virtual('fullName').get(() => {
    return `${this.firstName} ${this.lastName}` 
});

UserSchema.pre('save', async function(next) {
    this.password = await encrypt(this.password);
});

UserSchema.methods.checkPassword = async function(password) {
    return await compare(password, this.password);
};

UserSchema.methods.getPublicFields = function() {
    const publicFields = {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        email: this.email,
        orders: this.orders
    }
    return publicFields;
}

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, 'secretkey');
    this.tokens.push({token});
    return token;
}

module.exports = mongoose.model('User', UserSchema);