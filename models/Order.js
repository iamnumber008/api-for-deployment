const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [ true, "User ID is Required"]
	},
	products: [
		{
			productId: {
				type: String,
				required: [ true, "Product ID is Required"]
			},
			quantity: {
				type: Number,
				required: [ true, "Quantity is Required"]
			}
		}
	],
	totalAmount: {
		type: Number,
		required: [ true, "Total Amount is Required"]
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	}
});

module.exports = mongoose.model("Order", orderSchema);