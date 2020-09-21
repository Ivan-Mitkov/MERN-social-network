const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/users.js");
const userValidation = require("../../validations/userValidation");
//@route Post api/users
//@desk Register user route
//@access public
router.post(
  "/",
  userValidation.registerUserValidation,
  usersController.registerUser
);

module.exports = router;
