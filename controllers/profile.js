const request = require("request");
const config = require("config");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const { check, validationResult } = require("express-validator");

exports.getCurrentUser = async (req, res) => {
  try {
    //we have access to req.user and in Profile have user field
    //we need name and avatar but they are on user model not in req.user so we populate
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.updateOrCreateProfile = async (req, res) => {
  //get errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //if not errors
  //get data from the body
  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;

  //Build profile object
  const profileFields = {};
  //know that from the token
  profileFields.user = req.user.id;
  //the rest check if exists in the body and if exits and put it in the profileFields object

  if (company) profileFields.company = company;
  if (location) profileFields.location = location;
  if (website) profileFields.website = website;
  if (bio) profileFields.bio = bio;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }
  // console.log(profileFields.skills);
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;

  //Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (facebook) profileFields.social.facebook = facebook;

  //after building object we can update and insert data
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //if there is a profile update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //if not found profile - create one
    profile = new Profile(profileFields);
    //save it
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    console.dir(error);
    //if valid id but no user
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    //if not valid id
    res.status(500).send("Server error");
  }
};
exports.deleteProfileUserAndPosts = async (req, res) => {
  try {
    //1.remove users posts
    await Post.deleteMany({ user: req.user.id });
    //2.remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //finaly remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);

    //if not valid id
    res.status(500).send("Server error");
  }
};
exports.addExperience = async (req, res) => {
  //check if errors in the body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //if not errors get data from the body
  const { title, company, location, from, to, current, description } = req.body;
  //create experience array with objects
  //dates are M-D-Y
  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    //get the user profile
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //save the array in the user profile still not in DB
      profile.experience.unshift(newExperience);
    }
    //save profile in DB
    await profile.save();
    //return user profile
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    //if not valid id
    res.status(500).send("Server error");
  }
};
// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
exports.deleteExperience = async (req, res) => {
  try {
    //find profile
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.experience = foundProfile.experience.filter(
      //req.params.exp_id is string so need toString() on exp_id
      (exp) => exp._id.toString() !== req.params.exp_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error.message);

    //if not valid id
    res.status(500).send("Server error");
  }
};

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
exports.addEductaion = async (req, res) => {
  //check if errors in the body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //if not errors get data from the body
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;
  //create experience array with objects
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    //get the user profile
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //save the array in the user profile still not in DB
      profile.education.unshift(newEdu);
    }
    //save profile in DB
    await profile.save();
    //return user profile
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    //if not valid id
    res.status(500).send("Server error");
  }
};
// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
exports.deleteEducation = async (req, res) => {
  try {
    //find profile
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      //req.params.exp_id is string so need toString() on exp_id
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getUserHithubRepos = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientID"
      )}&client_secret=${config.get("guthubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (res.statusCode !== 200) {
        res.status(400).json({ msg: "No github profile found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
