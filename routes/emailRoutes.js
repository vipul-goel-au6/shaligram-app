const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  ConfirmEmail,
  ResetPassword,
  ResendOpt,
} = require("../controllers/emailController");

router.get(
  "/confirm-otp",
  passport.authenticate("jwt", { session: false }),
  ConfirmEmail
);
router.post("/resend-otp", ResendOpt);
router.post("/reset-password", ResetPassword);

module.exports = router;
