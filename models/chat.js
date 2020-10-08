const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const chatSchema = new Schema({
  to: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  from: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
