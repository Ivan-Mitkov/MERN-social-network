const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/profile.js");
const auth = require("../../middleware/auth");

const profileValidation = require("../../validations/profileValidation");
const experienceValidatiion = require("../../validations/experienceProfileValidation");

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
//@route GET api/profile
//@desk get all profiles
//@access Public
router.get("/", profileController.getAllProfiles);
//@route GET api/profile/user/:user_id
//@desk get all profiles
//@access Public
router.get("/user/:user_id", profileController.getProfileByUserId);
//@route DELETE api/profile/user/:user_id
//@desk delete profile, user and post
//@access Private
router.delete("/user", auth, profileController.deleteProfileUserAndPosts);
//@route PUT api/profile/experience
//@desk add profile experience
//@access Private
router.put(
  "/experience",
  [auth, experienceValidatiion.experienceProfileValidation],
  profileController.addExperience
);
//@route Delete api/profile/experience/:exp_id
//@desk add profile experience
//@access Private
router.delete("/experience/:exp_id", auth, profileController.deleteExperience);
//@route PUT api/profile/education
//@desk add profile education
//@access Private
router.put(
  "/education",
  [auth, profileValidation.addEducationValidation],
  profileController.addEductaion
);
//@route Delete api/profile/education/:edu_id
//@desk add profile education
//@access Private
router.delete("/education/:edu_id", auth, profileController.deleteEducation);
//@route GET api/profile/github/:username
//@desk Get user repo from github
//@access Public
router.get('/github/:username',profileController.getUserHithubRepos)


module.exports = router;
