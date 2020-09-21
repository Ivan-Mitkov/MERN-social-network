const express = require("express");
const router = express.Router();
const postsController = require("../../controllers/posts.js");

//@route GET api/posts
//@desk test route
//@access public
router.get("/", (req, res) => {
  res.send("Posts route");
});

module.exports = router;
