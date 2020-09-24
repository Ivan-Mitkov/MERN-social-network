const { check } = require("express-validator");

exports.checkPost = [check("text", "Text is required").not().isEmpty()];
