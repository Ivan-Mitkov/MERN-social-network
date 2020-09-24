const express = require("express");
const router = express.Router();
const postsController = require("../../controllers/posts.js");
const postValidation = require("../../validations/postValidation");
const mongooseChecks = require("../../middleware/mongooseSchecks");

const auth = require("../../middleware/auth");
//@route POST api/posts
//@desk Create a post
//@access private
router.post("/", [auth, postValidation.checkPost], postsController.createPost);
//@route GET api/posts
//@desk get all post
//@access private
router.get("/", auth, postsController.getPost);
//@route GET api/posts/:id
//@desk get post by an ID
//@access private
router.get(
  "/:id",
  [auth, mongooseChecks.checkObjectId("id")],
  postsController.getPostById
);
//@route DELETE api/posts/:id
//@desk delete post by an ID
//@access private
router.delete(
  "/:id",
  [auth, mongooseChecks.checkObjectId("id")],
  postsController.deletePostById
);

module.exports = router;
