const express = require("express");
const User = require("../models/User");

exports.getAuthenticatedUser = async (req, res) => {
  try {
    //get id from user we set in req object by auth middleware
    //don't get the password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
