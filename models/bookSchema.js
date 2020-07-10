const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    published: {type: Number, required: true},
    genre: {type: String, required: true},
    pages: {type: Number, required: true},
    cover: {type: String, required: true},
    quote: {type: String, required: true},
    overview: {type: String, required: true},
    price: {type: Number, required: true},
    favorite: {type: Boolean, default: false},
});

module.exports = mongoose.model("Book", BookSchema);