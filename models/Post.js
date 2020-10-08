const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  caption: {
    type: String,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: ObjectId,
      postedby: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      text: String,
      postedby: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],

  postedby: {
    type: ObjectId,
    ref: "User",
  }
},{
  timestamps: true
});

const Post = model("Post", postSchema);

module.exports = Post;
