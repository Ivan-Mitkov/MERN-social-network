const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.js");
const authLoginValidation = require("../../validations/authLoginValidation");
const auth = require("../../middleware/auth");


//@route GET api/auth
//@desk test route
//@access private
router.get("/", auth, authController.getAuthenticatedUser);

//@route Post api/auth
//@desk Login user
//@access public
router.post(
  "/",
  authLoginValidation.loginUserValidation,
  authController.loginUser
);
module.exports = router;
