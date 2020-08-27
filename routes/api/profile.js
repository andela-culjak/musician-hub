const express = require("express");
const router = express.Router();
const fs = require("fs");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/profile
//@desc     Create or update a user profile
//@access   Private
router.post(
  "/",
  [auth, [check("instruments", "Instruments is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      band,
      website,
      location,
      bio,
      position,
      instruments,
      genres,
      influences,
      videos,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object - add fields 1by1
    const profileFields = {};

    profileFields.user = req.user.id;
    profileFields.band = band;
    profileFields.website = website;
    profileFields.location = location;
    profileFields.bio = bio;
    profileFields.position = position;
    profileFields.instruments = instruments
      ? instruments.split(",").map((instrument) => instrument.trim())
      : [];
    profileFields.genres = genres ? genres.split(",").map((genre) => genre.trim()) : [];
    profileFields.influences = influences
      ? influences.split(",").map((influence) => influence.trim())
      : [];
    profileFields.videos = videos ? videos.split(",").map((video) => video.trim()) : [];

    profileFields.social = { youtube, facebook, twitter, instagram, linkedin };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user id
//@access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route    DELETE api/profile
//@desc     Delete profile, user & posts
//@access   Private
router.delete("/", auth, async (req, res) => {
  try {
    //@Remove user's posts
    await Post.deleteMany({ user: req.user.id });

    //Remove the profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove the user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    PUT api/profile/experience
//@desc     Add profile experience
//@access   Private
router.put(
  "/experience",
  [
    auth,
    [
      check("position", "Position is required").not().isEmpty(),
      check("band", "Band is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { position, band, location, from, to, current, description } = req.body;

    const newExp = {
      position,
      band,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp); //why no await?

      await profile.save();

      res.json(profile); //Whole profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete an experience from profile
//@access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get the remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/profile/upload-avatar
//@desc     Upload new avatar photo
//@access   Private
router.post("/upload-avatar", auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${process.cwd()}/client/public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const user = await User.findOne({ _id: req.user.id });

    //Change the avatar path
    user.avatar = `/uploads/${file.name}`;

    await user.save();
    res.json(user);
  });
});

//@route    POST api/profile/upload-cover
//@desc     Upload new cover photo
//@access   Private
router.post("/upload-cover", auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const dirPath = `${process.cwd()}/client/public/uploads/covers/${req.user.id}`;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  file.mv(`${dirPath}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const profile = await Profile.findOne({ user: req.user.id });

    //Change the avatar path
    profile.cover = `/uploads/covers/${req.user.id}/${file.name}`;

    await profile.save();
    res.json(profile);
  });
});

module.exports = router;
