const jwt = require("jsonwebtoken");
const config = require("config");

//Validate that user is authorised
module.exports = function (req, res, next) {
  //GET token from the header
  const token = req.header("x-auth-token");
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied " });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    //we attach user to the payload

    //attach decoded user to req object user so we can use it in any routes
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
