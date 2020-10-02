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
//@route PUT api/posts/like:id
//@desk like a post
//@access private
router.put(
  "/like/:id",
  [auth, mongooseChecks.checkObjectId("id")],
  postsController.likePost
);
//@route PUT api/posts/unlike:id
//@desk unlike a post
//@access private
router.put(
  "/unlike/:id",
  [auth, mongooseChecks.checkObjectId("id")],
  postsController.unLikePost
);
//@route POST api/posts/comment/:id
//@desk Create a post comment
//@access private
router.post(
  "/comment/:id",
  [auth, mongooseChecks.checkObjectId("id"), postValidation.checkPost],
  postsController.createPostComment
);
//@route DELETE api/posts/comment/:id/:comment_id
//@desk Delete a post comment
//@access private
router.delete(
  "/comment/:id/:comment_id",
  [
    auth,
    mongooseChecks.checkObjectId("id"),
    mongooseChecks.checkObjectId("comment_id"),
  ],
  postsController.deletePostComment
);
module.exports = router;
