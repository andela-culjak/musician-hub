const express = require("express");
const router = express.Router();
const fs = require("fs");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Music = require("../../models/Music");
const User = require("../../models/User");

//@route    GET api/music/user/:user_id
//@desc     Get music by user id
//@access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const music = await Music.findOne({
      user: req.params.user_id
    }).populate("user tracks.comments.user", ["name", "avatar"]);

    res.json(music);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Music not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route    POST api/music/upload-track
//@desc     Upload new music track
//@access   Private
router.post("/upload-track", auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  try {
    const file = req.files.track;
    const title = req.body.title;
    const duration = req.body.duration;
    const dirPath = `${process.cwd()}/client/public/uploads/tracks/${req.user.id}`;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    file.mv(`${dirPath}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      let music = await Music.findOne({ user: req.user.id });

      const newTrack = {
        title: title,
        url: `/uploads/tracks/${req.user.id}/${file.name}`,
        duration: duration,
        comments: [],
        likes: []
      };

      if (!music) {
        music = new Music({
          user: req.user.id,
          tracks: []
        });
      }

      music.tracks.push(newTrack);
      await music.save();
      res.json(music);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/music/comment/:profile_id/:track_id
//@desc     Comment on a music track
//@access   Private
router.post(
  "/comment/:music_id/:track_id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const music = await Music.findById(req.params.music_id);

      const trackIndex = music.tracks.findIndex(
        element => element.id === req.params.track_id
      );

      const newComment = {
        text: req.body.text,
        time: req.body.time,
        date: new Date(),
        user: user
      };

      music.tracks[trackIndex].comments.unshift(newComment);
      await music
        .save()
        .then(music =>
          music.populate("user tracks.comments.user", ["name", "avatar"]).execPopulate()
        );

      res.json(music.tracks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
