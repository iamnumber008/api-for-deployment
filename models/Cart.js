const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [ true, "User ID is Required."]
	},
	products: [
		{
			productId: {
				type: String,
				required: [ true, "Product ID is Required."]
			},
			quantity: {
				type: Number,
				required: [ true, "Quantity is Required."]
			},
			subTotal: {
				type: Number,
				required: [ true, "SubTotal is Required"]
			}
		}
	],
	totalAmount: {
		type: Number,
		required: [ true, "Total is Required"]
	}

});

module.exports = mongoose.model("Cart", cartSchema);