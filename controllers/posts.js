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
