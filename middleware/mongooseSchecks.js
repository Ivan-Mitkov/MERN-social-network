const mongoose = require("mongoose");
// middleware to check for a valid object id
exports.checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: "Invalid ID" });
  next();
};
