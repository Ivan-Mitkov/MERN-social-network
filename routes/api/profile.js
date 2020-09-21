const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/profile.js");

//@route GET api/profile
//@desk test route
//@access public
router.get("/", (req, res) => {
  res.send("Profile route");
});

module.exports = router;
