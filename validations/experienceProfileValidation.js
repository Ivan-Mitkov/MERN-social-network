const { check } = require("express-validator");
//https://express-validator.github.io/docs/custom-error-messages.html
//https://express-validator.github.io/docs/validation-result-api.html
exports.experienceProfileValidation = [
  check("title", "Title is reqiured").not().isEmpty(),
  check("company", "Company is reqiured").not().isEmpty(),
  check("from", "From date is reqiured").not().isEmpty(),
];
