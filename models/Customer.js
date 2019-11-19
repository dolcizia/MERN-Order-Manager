const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	address: {
		street: String,
		city: String,
		state: String,
		zip: Number
	},
	phone: {
		type: Number,
		required: true
	},
	orders: {
		type: [ Schema.Types.ObjectId ]
	}
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
