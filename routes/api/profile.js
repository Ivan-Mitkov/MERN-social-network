const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/profile.js");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const profileValidation = require("../../validations/profileValidation");

//@route GET api/profile/me
//@desk current user profile
//@access Private
router.get("/me", auth, profileController.getCurrentUser);
//@route Post api/profile
//@desk CREATE or UPDATE profile
//@access Private
router.post(
  "/",
  [auth, profileValidation.createOrUpdateValidation],
  profileController.updateOrCreateProfile
);

module.exports = router;
