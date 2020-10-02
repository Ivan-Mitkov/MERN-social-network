const config = require("config");
const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const { check, validationResult } = require("express-validator");
//@route POST api/posts
//@desk Create a post
//@access private
exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //find logged in user
    const user = await User.findById(req.user.id).select("-password");
    //create new post object from request
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    // save post object in DB
    const post = await Post(newPost).save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
//@route GET api/posts
//@desk get all post
//@access private
exports.getPost = async (req, res) => {
  try {
    //sort by date most recenr first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
//@route GET api/posts/:id
//@desk get post by an ID
//@access private
exports.getPostById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    // CHECK if id is valid string for mongoose.Types.ObjectId
    //moved to router file with middleware
    // try {
    //   mongoose.Types.ObjectId(req.params.id);
    // } catch (error) {
    //   console.error(error.message);
    //   return res.status(404).send("Id not found");
    // }
    console.error(error.message);
    return res.status(500).send("Server error");
  }
};
//@route DELETE api/posts/:id
//@desk delete post by an ID
//@access private
exports.deletePostById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const post = await Post.findById(id);

    //check if user own the post
    //post.user is ObjectId
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorised" });
    }
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    await post.remove();
    res.json({ msg: "post deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
};
//@route PUT api/posts/like/:id
//@desk like a post
//@access private
exports.likePost = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const post = await Post.findById(id);
    // console.log(post);
    //check if post has already been liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    //if its not liked push new like
    post.likes.unshift({ user: req.user.id });
    //save to DB
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error("Like error: ", error.message);
    return res.status(500).send("Server error");
  }
};
//@route PUT api/posts/unlike/:id
//@desk unlike a post
//@access private
exports.unLikePost = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const post = await Post.findById(id);
    // Check if the post has not yet been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post is not yet liked" });
    }
    const newlikes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    post.likes = newlikes;
    //save to DB
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error("unLike error: ", error.message);
    return res.status(500).send("Server error");
  }
};

//@route POST api/posts/comment/:id
//@desk Create a post comment
//@access private
exports.createPostComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //find logged in user
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    //create new post object from request
    const newPostComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newPostComment);
    // save post object in DB
    await Post(post).save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
//@route DELETE api/posts/comment/:id/:comment_id
//@desk Delete a post comment
//@access private
exports.deletePostComment = async (req, res) => {
  try {
    //find logged in user
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exists" });
    }
    // console.log(comment)
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You can not delete this comment" });
    }

    const newcomments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
    );
    // console.log(newcomments);
    post.comments = newcomments;
    // save post object in DB
    await Post(post).save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
