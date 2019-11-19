const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
	name: String,
	category: String,
	price: Number
});

module.exports = Product = mongoose.model('product', ProductSchema);
