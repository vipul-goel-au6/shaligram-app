const User = require("../models/User");
const { randomBytes } = require("crypto");
const { sendResetPasswordMail, sendOtpMail } = require("../utils/sendMail");
const { verifyOtp, generateOtp } = require("../utils/speakeasy");
const { verifyOtpSms, sendOtpSms } = require("../utils/sendSMS");

module.exports = {
  async ConfirmEmail(req, res) {
    const token = req.query.otp;
    const secret = req.headers.otpsecret;
    const user = req.user;
    try {
      const accessToken = user.accessToken;
      let isVerified;
      if (user.email !== null) {
        isVerified = verifyOtp(secret, token);
        user.isVerified = isVerified;
      } else {
        isVerified = await verifyOtpSms(user.phoneNumber, token);
        user.isVerified = isVerified;
      }
      await user.save();
      if (isVerified) {
        res.status(200).json({
          success: true,
          message: "OPT confirmed. User registed successfully",
          _id: user._id,
          name: user.name,
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userDetails: user.userDetails,
          isVerified,
          JWTaccessToken: `JWT ${accessToken}`,
          JWTexpiresIn: "12h",
        });
      } else {
        res.json({ error: "Invalid or Expired OPT", success: false });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message, success: false });
    }
  },

  async ResetPassword(req, res) {
    try {
      const { email } = req.body;
      const token = randomBytes(8).toString("hex");
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(422)
          .json({ error: "User don't exist with that email" });
      user.resetPassword.token = token;
      user.resetPassword.expiresIn = Date.now() + 1000 * 60 * 60;
      await user.save();
      await sendResetPasswordMail(user.email, user.name, token);
      res.status(200).json({ message: "check your email", success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error", success: false });
    }
  },

  async ResendOpt(req, res) {
    let otpSecret = null;
    console.log(req.body);
    try {
      const { mode, ...rest } = req.body;
      if (mode === "email") {
        const { secret, token } = generateOtp();
        await sendOtpMail(rest.email, rest.name, token);
        otpSecret = secret;
      } else {
        await sendOtpSms(rest.phoneNumber);
      }
      res.json({ success: true, message: "OTP sent successfully", otpSecret });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "server error, try later", success: false });
    }
  },
};
