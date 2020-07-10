const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    quantity: {type: Number, required: true},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Order", OrderSchema);