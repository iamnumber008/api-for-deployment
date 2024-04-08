const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;
const router = express.Router();

router.post("/", verify, verifyAdmin, productController.addProduct);

router.get("/",  productController.getAllProduct);

router.get("/getActiveProducts", verify, productController.getActiveProduct);

router.get("/:id", productController.getSingleProduct);

router.put("/:id", verify, verifyAdmin, productController.updateProduct);

router.put("/:id/archive", verify, verifyAdmin, productController.archiveProduct);

router.put("/:id/activate", verify, verifyAdmin, productController.activateProduct);

module.exports = router;
