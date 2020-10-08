const express = require("express");
const passport = require("passport");
const router = express.Router();
const uplaodwithmulter = require("../utils/multer");
const { CreateStory, GetStories } = require("../controllers/storiesController");

router.post(
  "/uploadstory",
  passport.authenticate("jwt", { session: false }),
  uplaodwithmulter.single("storyfiles"),
  CreateStory
);

router.get(
  "/getstories",
  passport.authenticate("jwt", { session: false }),
  uplaodwithmulter.single("storyfiles"),
  GetStories
);

module.exports = router;
