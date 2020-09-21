const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users.js");

//@route GET api/users
//@desk test route
//@access public
router.get("/", (req, res) => {
  res.send("User route");
});

module.exports = router;
