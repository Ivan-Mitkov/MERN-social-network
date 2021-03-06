//https://express-validator.github.io/docs/custom-error-messages.html
//https://express-validator.github.io/docs/validation-result-api.html
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // console.log(req.body);
  const { name, email, password } = req.body;

  try {
    //see if user exit if exists send error
    let user = await User.findOne({ email: email });
    if (user) {
      //return for not sending status again later
      return res.status(500).json({ errors: [{ msg: "User already exists" }] });
    }
    //get user gravatar
    //https://www.npmjs.com/package/gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    user = new User({ name, email, avatar, password });
    //encrypt password
    //https://www.npmjs.com/package/bcryptjs
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    //save user in DB
    await user.save();
    // res.send("User register");

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
