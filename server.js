const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Database Configuration
const db = require('./config/keys').mongoURI;

// Connect to Database
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

// Routes
const customers = require('./routes/api/customers');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');
app.use('/api/customers', customers);
app.use('/api/products', products);
app.use('/api/orders', orders);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Server Config & Connect
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
