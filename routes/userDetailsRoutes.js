const express = require("express");
const passport = require("passport");
const uplaodwithmulter = require("../utils/multer");
const router = express.Router();
const {
  Follow,
  UnFollow,
  UpdateProfilePhoto,
  UpdateUserDetails,
  ChangePassword,
  GetFollowSuggestions,
  SearchUser,
  RemoveProfilePhoto,
} = require("../controllers/userDetailsController");

router.put("/follow", passport.authenticate("jwt", { session: false }), Follow);

router.put(
  "/unfollow",
  passport.authenticate("jwt", { session: false }),
  UnFollow
);
router.put(
  "/updatephoto",
  passport.authenticate("jwt", { session: false }),
  uplaodwithmulter.single("profilepic"),
  UpdateProfilePhoto
);
router.put(
  "/removephoto",
  passport.authenticate("jwt", { session: false }),
  RemoveProfilePhoto
);
router.put(
  "/updateuserdetails",
  passport.authenticate("jwt", { session: false }),
  UpdateUserDetails
);

router.put(
  "/changepassword",
  passport.authenticate("jwt", { session: false }),
  ChangePassword
);

router.get(
  "/suggestion",
  passport.authenticate("jwt", { session: false }),
  GetFollowSuggestions
);

router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  SearchUser
);

module.exports = router;
