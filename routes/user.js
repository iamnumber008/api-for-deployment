const express = require('express');
const userController = require("../controllers/user");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post("/register", userController.registerUser);

// [Not part of the Requirement]
// router.get("/getAllUsers", userController.getAllUsers);
// --------------------------------

router.post("/login", userController.loginUser);

router.get("/details", verify, userController.retrieveUserDetails);

// [Stretch Goals]
router.patch("/:id/setAdmin", verify, verifyAdmin, userController.setAdmin);

module.exports = router;