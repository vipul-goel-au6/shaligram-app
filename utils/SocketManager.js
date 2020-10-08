const io = require("../app").io;
const User = require("../models/User");
const Chats = require("../models/chat");
const ConnectedUsers = require("./SocketUsers");

module.exports = (socket) => {
  console.log("chat connected...");
  const userId = socket.handshake.query.user;
  ConnectedUsers.create(socket, userId);
  socket.on("send message", async ({ body, from, to }) => {
    try {
      const friendData = await User.findById(from).select(
        "name userDetails.profilePic"
      );
      await Chats.create({ to, from, body });
      const reciever = ConnectedUsers.get(to);
      reciever.emit("message", { body, from, to, ...friendData });
    } catch (err) {
      console.log(err);
      io.to(socket.id).emit(
        "error",
        "OOPS, Something Went Wrong, Please Try Again Later"
      );
    }
  });
};
