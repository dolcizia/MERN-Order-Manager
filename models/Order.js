const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema(
	{
		customer: {
			type: Schema.Types.ObjectId,
			ref: 'customer'
		},
		delivery: {
			street: String,
			city: String,
			state: String,
			zip: Number,
			date: Date
		},
		orderItems: [
			{
				item: {
					type: Schema.Types.ObjectId,
					ref: 'product'
				},
				quantity: {
					type: Number,
					default: 1
				},
				lineTotal: {
					type: Number
				}
			}
		],
		orderTotal: Number
	},
	{
		timestamps: true
	}
);

module.exports = Order = mongoose.model('order', OrderSchema);
