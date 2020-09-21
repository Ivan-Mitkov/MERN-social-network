const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.js");
const auth = require("../../middleware/auth");
//@route GET api/auth
//@desk test route
//@access public
router.get("/", auth, authController.getAuthenticatedUser);

module.exports = router;
