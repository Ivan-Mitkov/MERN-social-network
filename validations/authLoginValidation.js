const { check } = require("express-validator");
//https://express-validator.github.io/docs/custom-error-messages.html
//https://express-validator.github.io/docs/validation-result-api.html
exports.loginUserValidation = [
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Password is required"
  ).exists(),
];
