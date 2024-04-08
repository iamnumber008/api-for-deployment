const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	img: {
		type: String,
		required: [false]
	},
	name: {
		type: String,
		required: [ true, "Name of Product Required"]
	},
	description: {
		type: String,
		required: [ true, "Description is Required"]
	},
	price: {
		type: Number,
		required: [ true, "Price is Required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	}	
});

module.exports = mongoose.model("Product", productSchema);