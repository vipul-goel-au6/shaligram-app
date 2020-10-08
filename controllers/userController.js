const User = require("../models/User");
const Post = require("../models/Post");
const { generateOtp } = require("../utils/speakeasy");
const { sendOtpMail } = require("../utils/sendMail");
const { sendOtpSms } = require("../utils/sendSMS");

module.exports = {
  async SignUp(req, res) {
    let otpSecret = null;
    try {
      const { name, userName, credentials, password, mode } = req.body;
      if (!name || !userName || !password || !credentials) {
        return res.status(400).json({ error: "Bad request", success: false });
      }
      const user = await User.findOne({ [mode]: credentials });
      if (user) {
        return res
          .status(422)
          .json({ error: "User already exists", success: false });
      }
      const newUser = await User.create({
        [mode]: credentials,
        userName,
        name,
        password,
      });
      const accessToken = await newUser.generateToken();
      if (mode === "email") {
        const { secret, token } = generateOtp();
        await sendOtpMail(newUser.email, newUser.name, token);
        otpSecret = secret;
      } else {
        await sendOtpSms(newUser.phoneNumber);
      }
      res.status(201).json({
        success: true,
        message: "OTP sent successfully to registed email",
        otpSecret: otpSecret,
        _id: newUser._id,
        name,
        userName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        userDetails: newUser.userDetails,
        isVerified: newUser.isVerified,
        JWTaccessToken: `JWT ${accessToken}`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, error: "Server Error" });
    }
  },

  async SignIn(req, res) {
    try {
      const {
        _id,
        name,
        userName,
        email,
        phoneNumber,
        userDetails,
        isVerified,
      } = req.user;
      const accessToken = await req.user.generateToken();
      res.status(200).json({
        success: true,
        message: "you are now signed in ",
        _id,
        name,
        userName,
        email,
        phoneNumber,
        userDetails,
        isVerified,
        JWTaccessToken: `JWT ${accessToken}`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error", success: false });
    }
  },

  async VerifyUniqueUseName(req, res) {
    try {
      const userName = req.query.q;
      const user = await User.findOne({ userName: userName });
      if (!user) {
        res.json({ message: "Username is Available", success: true });
      } else {
        res.json({ error: "Username is Unavailable", success: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  },

  async UpdatePassword(req, res) {
    try {
      const newPassword = req.body.password;
      const sentToken = req.body.token;
      const user = await User.findOne({
        "resetPassword.token": sentToken,
        "resetPassword.expiresIn": { $gt: Date.now() },
      });
      if (!user)
        return res
          .status(422)
          .json({ error: "Session has expired. Try again" });
      user.password = newPassword;
      user.resetPassword.token = undefined;
      user.resetPassword.expiresIn = undefined;
      await user.save();
      res
        .status(200)
        .json({ message: "password updated successfully", success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message, success: false });
    }
  },

  async ShowOtherUser(req, res) {
    try {
      const user = await User.findOne({ userName: req.params.userName })
        .populate({
          path: "userDetails.followers",
          select: "_id name userName userDetails.profilePic",
        })
        .populate({
          path: "userDetails.following",
          select: "_id name userName userDetails.profilePic",
        })
        .select("-password");
      const posts = await Post.find({ postedby: user._id })
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .sort("-createdAt");
      res.json({ user, posts, success: true });
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: "User not found", success: false });
    }
  },
};