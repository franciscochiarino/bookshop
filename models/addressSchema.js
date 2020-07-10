const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: {type: String},
    city: {type: String},
    country: {type: String}
});

module.exports = AddressSchema;