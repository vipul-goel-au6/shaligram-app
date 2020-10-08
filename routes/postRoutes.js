const express = require("express");
const passport = require("passport");
const router = express.Router();
const uplaodwithmulter = require("../utils/multer");
const {
  CreatePost,
  GetPosts,
  MyPosts,
  Like,
  UnLike,
  Comment,
  DeletePost,
  GetFollowPosts,
  EditPost,
} = require("../controllers/postController");

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  uplaodwithmulter.single("mediafiles"),
  CreatePost
);
router.get(
  "/allposts",
  passport.authenticate("jwt", { session: false }),
  GetPosts
);
router.get(
  "/followedposts",
  passport.authenticate("jwt", { session: false }),
  GetFollowPosts
);
router.get(
  "/myposts",
  passport.authenticate("jwt", { session: false }),
  MyPosts
);
router.put("/like", passport.authenticate("jwt", { session: false }), Like);
router.put("/unlike", passport.authenticate("jwt", { session: false }), UnLike);
router.put(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  Comment
);
router.delete(
  "/deletepost/:postId",
  passport.authenticate("jwt", { session: false }),
  DeletePost
);
router.put(
  "/editpost/:postId",
  passport.authenticate("jwt", { session: false }),
  EditPost
);
module.exports = router;
