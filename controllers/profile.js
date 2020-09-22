const Profile = require("../models/Profile");
const User = require("../models/User");
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
