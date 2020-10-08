const express = require("express");
const http = require("http");
const socket = require("socket.io");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
require("./models/db");
require("./utils/passport");

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(require("./routes/userRoutes"));
app.use(require("./routes/postRoutes"));
app.use(require("./routes/emailRoutes"));
app.use(require("./routes/userDetailsRoutes"));
app.use(require("./routes/chatRoutes"));
app.use(require("./routes/storiesRoutes"));

const io = (module.exports.io = socket(server));
const SocketManager = require("./utils/SocketManager");
io.on("connection", SocketManager);

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

server.listen(PORT, () => {
  console.log("server connected at", PORT);
});
