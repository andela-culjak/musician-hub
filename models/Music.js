const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  tracks: [
    {
      title: {
        type: String
      },
      url: {
        type: String
      },
      duration: {
        type: Number
      },
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          text: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          },
          time: {
            type: Number
          }
        }
      ],
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          }
        }
      ]
    }
  ]
});

module.exports = Music = mongoose.model("music", MusicSchema);
