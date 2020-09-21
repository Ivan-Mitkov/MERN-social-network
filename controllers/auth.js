const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");

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

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // console.log(req.body); password is plain text which user enters
  const { email, password } = req.body;

  try {
    //see if user exit if exists send error
    let user = await User.findOne({ email: email });
    if (!user) {
      //return for not sending status again later
      return res.status(500).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    //we have found user he has encrypted password,
    //so we need to mach password from user with password from db
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(500).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    //Return json webtoken
    // https://www.npmjs.com/package/jsonwebtoken
    //user.id from the saved user
    const payload = {
      user: {
        //mongoose use abstraction so instead _id from mongo get id
        id: user.id,
      },
    };
    const secret = config.get("jwtsecret");
    // console.log("secret: ", secret);
    jwt.sign(payload, secret, { expiresIn: 3600000 }, (err, token) => {
      if (err) throw new Error(err);
      //if not error send token to the client
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};
