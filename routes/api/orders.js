const express = require('express');
const router = express.Router();

// Import Models
const Order = require('../../models/Order');

// @route 	GET api/orders
// @desc 		Get all orders
router.get('/', (req, res) => {
	Order.find()
		.populate('customer')
		.populate('orderItems.item')
		.sort({ date: -1 })
		.then((orders) => res.json(orders));
});

// @route 	POST api/orders
// @desc 		Create new order
router.post('/', (req, res) => {
	const { customer, orderItems, delivery, orderTotal } = req.body;

	const newOrder = new Order({
		customer,
		delivery,
		orderItems,
		orderTotal
	});

	newOrder.save().then((order) => res.json(order));
});

// @route 	GET api/orders/:id
// @desc 		Show single order
router.get('/:id', (req, res) => {
	Order.findById(req.params.id)
		.populate('customer')
		.populate('orderItems.item')
		.then((order) => res.json(order))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route 	POST api/orders/:id
// @desc 		Update an order
router.post('/:id', (req, res) => {
	const { customer, delivery, orderItems, orderTotal } = req.body;

	Order.findById(req.params.id)
		.then((order) => {
			order.customer = customer;
			order.delivery = delivery;
			order.orderItems = orderItems;
			order.orderTotal = orderTotal;
			order
				.save()
				.then(() => res.json('Order Updated'))
				.catch((err) => res.status(400).json('Error ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route 	DELETE api/orders/:id
// @desc 		Delete an order
router.delete('/:id', (req, res) => {
	Order.findById(req.params.id)
		.then((order) =>
			order.remove().then(() =>
				res.json({
					success: true
				})
			)
		)
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
