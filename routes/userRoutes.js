const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  SignUp,
  SignIn,
  UpdatePassword,
  ShowOtherUser,
  VerifyUniqueUseName,
} = require("../controllers/userController");

router.post("/signup", SignUp);
router.get("/checkusername", VerifyUniqueUseName);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  SignIn
);
router.post("/update-password", UpdatePassword);

router.get(
  "/user/:userName",
  passport.authenticate("jwt", { session: false }),
  ShowOtherUser
);

module.exports = router;