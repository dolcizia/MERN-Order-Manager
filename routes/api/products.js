const express = require('express');
const router = express.Router();

// Product Model
const Product = require('../../models/Product');

// @route 	GET api/products
// @desc 		Get all products
router.get('/', (req, res) => {
	Product.find().sort({ category: 1, name: 1 }).then((products) => res.json(products));
});

// @route		POST api/products
// @desc 		Create a product
router.post('/', (req, res) => {
	const { name, category, price } = req.body;

	const newProduct = new Product({
		name,
		category,
		price
	});

	newProduct.save().then((product) => res.json(product));
});

// @route 	GET api/products/:id
// @desc 		Show single product
router.get('/:id', (req, res) => {
	Product.findById(req.params.id)
		.then((product) => res.json(product))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route 	POST api/products/:id
// @desc 		Update a product
router.post('/:id', (req, res) => {
	const { name, category, price } = req.body;

	Product.findById(req.params.id)
		.then((product) => {
			product.name = name;
			product.category = category;
			product.price = price;
			product
				.save()
				.then(() => res.json('Product Updated'))
				.catch((err) => res.status(400).json('Error ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route		DELETE api/products/:id
// desc 		Delete a product
router.delete('/:id', (req, res) => {
	Product.findById(req.params.id)
		.then((product) =>
			product.remove().then(() =>
				res.json({
					success: true
				})
			)
		)
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
