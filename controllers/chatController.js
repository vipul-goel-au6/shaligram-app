const User = require("../models/User");
const Chat = require("../models/chat");

module.exports = {
  async GetChats(req, res) {
    const userId = req.user._id;
    const friendId = req.params.friendId;
    try {
      const messages = await Chat.find({
        $or: [
          { $and: [{ from: userId }, { to: friendId }] },
          { $and: [{ to: userId }, { from: friendId }] },
        ],
      });
      const data = await User.findById(friendId).select(
        "name userDetails.profilePic"
      );
      res.json({ messages, data });
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: err.message });
    }
  },

  async GetActiveChats(req, res) {
    const userId = req.user._id;
    try {
      const myMessages = await Chat.find({
        $or: [{ from: userId }, { to: userId }],
      });
      let uniqueChats = {};
      myMessages.forEach((msg) => {
        if (
          !uniqueChats[msg.from] &&
          msg.from.toString() !== userId.toString()
        ) {
          uniqueChats[msg.from] = true;
        } else if (
          !uniqueChats[msg.to] &&
          msg.to.toString() !== userId.toString()
        ) {
          uniqueChats[msg.to] = true;
        }
      });
      const myChats = [];
      for (id of Object.keys(uniqueChats)) {
        const data = await User.findById(id).select(
          "_id name userDetails.profilePic"
        );
        myChats.push(data);
      }
      res.json(myChats);
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: err.message });
    }
  },
};
