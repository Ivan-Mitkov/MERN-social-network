const { check } = require("express-validator");
//https://express-validator.github.io/docs/custom-error-messages.html
//https://express-validator.github.io/docs/validation-result-api.html
exports.createOrUpdateValidation = [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
];

exports.addEducationValidation = [
  check("school", "School is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("fieldofstudy", "Field of study is required").not().isEmpty(),
  check("from", "From date is required and needs to be from the past")
    .not()
    .isEmpty(),
];
