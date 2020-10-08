const express = require("express");
const passport = require("passport");
const router = express.Router();
const { GetChats, GetActiveChats } = require("../controllers/chatController");

router.get(
  "/getchat/:friendId",
  passport.authenticate("jwt", { session: false }),
  GetChats
);

router.get(
  "/getactivechats",
  passport.authenticate("jwt", { session: false }),
  GetActiveChats
);

module.exports = router;