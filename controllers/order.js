const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

module.exports.createOrder = async (req, res) => {
  // Ensure the user exists
  const validUser = await User.findById(req.user.id);
  if (!validUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (req.user.isAdmin) {
    return res.send("User account only");
  }

  try {
    const { products } = req.body;

    // Calculate the total amount based on the product prices
    let totalAmount = 0;

    for (const productInfo of products) {
      const product = await Product.findById(productInfo.productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      totalAmount += product.price * productInfo.quantity;
    }

    const order = new Order({
    	userId: req.user.id,
      products,
      totalAmount,
      purchasedOn: new Date(),
    });

    const savedOrder = await order.save();

    res.status(201).json(true);

  } catch (error) {
    console.error('Error creating the order:', error);
    res.status(500).json({ message: "An error occurred while creating the Order." });
  }

};

module.exports.getMyOrders = async (req, res) => {
  if (req.user.isAdmin) {
    return res.send("You are an Admin, only the user can see this order.");
  }

  try {
    let myOrder = await Order.find({ userId: req.user.id });

    return res.send(myOrder);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving all Orders." });
  }
};


module.exports.getAllOrders = async(req, res) => {
	try{
		let orders = await Order.find({});

		return res.send(orders);
	} catch(error){
		res.status(500).json({ message: "An error occured while retrieving all Orders." });
	}
};

