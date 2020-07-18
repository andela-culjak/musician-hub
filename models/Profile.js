const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  band: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  position: {
    type: String,
  },
  instruments: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
  },
  influences: {
    type: [String],
  },
  videos: {
    type: [String],
  },
  music: {
    type: Schema.Types.ObjectId,
    ref: "music",
  },
  bio: {
    type: String,
  },
  experience: [
    {
      position: {
        type: String,
        required: true,
      },
      band: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
