const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.js");

//@route GET api/auth
//@desk test route
//@access public
router.get("/", (req, res) => {
  res.send("Auth route");
});

module.exports = router;
