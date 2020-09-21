const { check } = require("express-validator");
//https://express-validator.github.io/docs/custom-error-messages.html
//https://express-validator.github.io/docs/validation-result-api.html
exports.registerUserValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more caracters"
  ).isLength({ min: 6 }),
];
