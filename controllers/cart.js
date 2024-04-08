const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");

module.exports.addToCart = async (req, res) => {

  const validUser = await User.findById(req.params.id);

  if (!validUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  if(req.user.id !== validUser.id){
    return res.send("You are not the logged in User.")
  }
	if(req.user.isAdmin){
		return res.send("Users only")
	}
	try{
		const { products } = req.body;

	    // Calculate the total amount based on the product prices
	    let totalAmount = 0;

	    for(const productInfo of products){

	    	const product = await Product.findById(productInfo.productId);

	    	if (!product) {
	        	return res.status(404).json({ message: 'Product not found' });
	        }

	        productInfo.subTotal = productInfo.quantity * product.price;
	        totalAmount += productInfo.subTotal;
	    }

        const cart = new Cart({
          userId: req.params.id,
          products,
          totalAmount,
          purchasedOn: new Date(),
        });

        const savedCart = await cart.save();

        res.status(201).json(savedCart);

	} catch(error) {
		console.error(error)
		res.status(500).json({ message: "An error occured while adding to Cart." });
	}
};

module.exports.getAllCarts = async(req, res) => {
  const user = await User.findById(req.params.id)
  if(req.user.id !== user.id){
    return res.send("You are not the logged in User.")
  }
	try{
		let cart = await Cart.find({});

		return res.send(cart);
	} catch(error){
		res.status(500).json({ message: "An error occured while trying to retrieve all Cart." });
	}
};

module.exports.updateQuantity = async (req, res) => {
  const user = await User.findById(req.params.id)
  if(req.user.id !== user.id){
    return res.send("You are not the logged in User.")
  }
  try {
    const { cartId, productId } = req.params;

    // Find the cart and the product to update
    let cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productToUpdate = cart.products.find((product) => product.productId.toString() === productId);

    if (!productToUpdate) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    // Update quantity if provided in the request body
    if (req.body.quantity !== undefined) {
      productToUpdate.quantity = req.body.quantity;

      // Fetch the product details including price
      const productDetails = await Product.findById(productId);

      if (!productDetails) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Update subTotal based on the updated quantity and product price
      productToUpdate.subTotal = productToUpdate.quantity * productDetails.price || 0;
    }

    // Update totalAmount in the cart
    cart.totalAmount = cart.products.reduce((total, product) => total + (product.subTotal || 0), 0);

    // Save the updated cart
    await cart.save();

    res.json({ message: 'Quantity updated successfully', updatedCart: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.removeProduct = async (req, res) => {
  const user = await User.findById(req.params.id)
  if(req.user.id !== user.id){
    return res.send("You are not the logged in User.")
  }
  try {
    const { cartId, productId } = req.params;

    // Find the cart
    let cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the product to remove
    const productIndex = cart.products.findIndex((product) => product.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    // Remove the product from the products array
    cart.products.splice(productIndex, 1);

    // Update totalAmount in the cart
    cart.totalAmount = cart.products.reduce((total, product) => total + (product.subTotal || 0), 0);

    // Save the updated cart
    await cart.save();

    res.json({ message: 'Product removed successfully', updatedCart: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

