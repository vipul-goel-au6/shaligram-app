const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const storiesSchema = new Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    postedby: {
      type: ObjectId,
      ref: "User",
    },

    expiresIn: {
      type: Date,
      default: Date.now() + 1000 * 60 * 60 * 24
    }
  },
  { timestamps: true }
);

const Stories = model("Stories", storiesSchema);

module.exports = Stories;
