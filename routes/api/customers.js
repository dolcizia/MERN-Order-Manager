const express = require('express');
const router = express.Router();

// Customer Model
const Customer = require('../../models/Customer');

// @route 	GET api/customers
// @desc 		Get all customers
router.get('/', (req, res) => {
	Customer.find().sort({ name: 1 }).then((customers) => res.json(customers));
});

// @route 	POST api/customers
// @desc 		Create a customer
router.post('/', (req, res) => {
	const { name, email, address, phone } = req.body;

	const newCustomer = new Customer({
		name,
		email,
		address,
		phone
	});

	newCustomer.save().then((customer) => res.json(customer));
});

// @route 	GET api/customers/:id
// @desc 		Show single customer
router.get('/:id', (req, res) => {
	Customer.findById(req.params.id)
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route 	POST api/customers/:id
// @desc 		Update a customer
router.post('/:id', (req, res) => {
	const { name, email, address, phone } = req.body;

	Customer.findById(req.params.id)
		.then((customer) => {
			customer.name = name;
			customer.email = email;
			customer.address = address;
			customer.phone = phone;
			customer
				.save()
				.then(() => res.json('Customer Updated'))
				.catch((err) => res.status(400).json('Error ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route		DELETE api/customers/:id
// @desc 		Delete a customer
router.delete('/:id', (req, res) => {
	Customer.findById(req.params.id)
		.then((customer) => customer.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
