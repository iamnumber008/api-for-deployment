const express = require("express");
const orderController = require("../controllers/order");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;
const router = express.Router();

router.post("/", verify, orderController.createOrder);

// [Stretch Goals]
router.get("/myOrders", verify, orderController.getMyOrders);

router.get("/", verify, verifyAdmin, orderController.getAllOrders);

module.exports = router;