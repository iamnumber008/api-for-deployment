const express = require("express");
const cartController = require("../controllers/cart");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;
const router = express.Router();

router.post("/:id", verify, cartController.addToCart);

router.get("/:id", verify, cartController.getAllCarts);

router.put("/:id/:cartId/:productId", verify, cartController.updateQuantity);

router.delete("/:id/:cartId/:productId", verify, cartController.removeProduct);

module.exports = router;