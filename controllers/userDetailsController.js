const User = require("../models/User");
const cloudinary = require("cloudinary");
const { compare } = require("bcryptjs");
require("../utils/cloudinary");

module.exports = {
  async Follow(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.body.followId,
        {
          $push: { "userDetails.followers": req.user._id },
        },
        {
          new: true,
        }
      ).populate({
        path: "userDetails.followers",
        select: "_id name userName userDetails.profilePic",
      })
      .populate({
        path: "userDetails.following",
        select: "_id name userName userDetails.profilePic",
      })
      .select("-password");
      if (user) {
        const user2 = await User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { "userDetails.following": req.body.followId },
          },
          {
            new: true,
          }
        ).select("-password");
        res.json({myUser: user2, otherUser: user, success: true});
      }
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: err.message, success: false });
    }
  },

  async UnFollow(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.body.unFollowId,
        {
          $pull: { "userDetails.followers": req.user._id },
        },
        {
          new: true,
        }
      ).populate({
        path: "userDetails.followers",
        select: "_id name userName userDetails.profilePic",
      })
      .populate({
        path: "userDetails.following",
        select: "_id name userName userDetails.profilePic",
      })
      .select("-password");
      if (user) {
        const user2 = await User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { "userDetails.following": req.body.unFollowId },
          },
          {
            new: true,
          }
        ).select("-password");
        res.json({myUser: user2, otherUser: user, success: true});
      }
    } catch (err) {
      res.status(422).json({ error: err.message, success: false });
    }
  },

  async UpdateProfilePhoto(req, res) {
    try {
      const user = req.user;
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const profilePic = result.secure_url;
      if (!profilePic) {
        res.status(422).json({ error: "Photo is required" });
      }
      user.userDetails.profilePic = profilePic;
      await user.save();
      res.json({
        message: "Profile Photo Updated Successfully",
        userDetails: user.userDetails,
      });
    } catch (err) {
      res.status(422).json({ error: err.message });
    }
  },

  async RemoveProfilePhoto(req,res) {
    try{
      const user = req.user
      user.userDetails.profilePic = "https://res.cloudinary.com/dpad3bwv8/image/upload/v1593763032/d_dicqns.png"
      await user.save()
      res.json({
        message: "Profile Photo Removed Successfully",
        userDetails: user.userDetails,
      });
    }catch(err){
      res.status(422).json({ error: err.message });
    }
  },

  async UpdateUserDetails(req, res) {
    try {
      const user = req.user;
      const name = req.body.name;
      const bio = req.body.bio;
      const email = req.body.email
      const userName = req.body.userName;
      const phoneNumber = req.body.phoneNumber;
      user.name = name;
      user.userDetails.bio = bio;
      user.userName = userName;
      user.phoneNumber = phoneNumber;
      user.email = email
      await user.save();
      res.json({
        message: "Details Updated Successfully",
        userDetails: user.userDetails,
        name: user.name,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber
      });
    } catch (err) {
      console.log(err)
      res.status(422).json({ error: err.message });
    }
  },

  async ChangePassword(req, res) {
    try {
      const user = req.user;
      const oldPasword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const isMatched = await compare(oldPasword, user.password);
      if (!isMatched) {
        return res.json({ error: "incorrect password" });
      } else {
        user.password = newPassword;
        await user.save();
        return res.json({
          message: "Password Updated Successfully",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: err.message });
    }
  },

  async GetFollowSuggestions(req, res) {
    try {
      const suggestId = await Promise.all(
        req.user.userDetails.following.map((id1) =>
          User.findById(id1).select("userDetails.following")
        )
      );
      const suggestArray = [];
      suggestId.map((obj) => suggestArray.push(...obj.userDetails.following));
      const suggestions = await Promise.all(
        suggestArray.map((id2) =>
          User.findById(id2).select("_id name userName userDetails.profilePic")
        )
      );
      suggestions.filter(
        (user) => !req.user.userDetails.following.includes(user._id)
      );
      res.json(suggestions);
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: err.message });
    }
  },

  async SearchUser(req, res) {
    try {
      const query = req.query.q;
      let userPattern = new RegExp("^" + query);
      const searchedUsers = await User.find({
        $or: [
          { name: { $regex: userPattern } },
          { userName: { $regex: userPattern } },
        ],
      }).select("_id name userName userDetails.profilePic");
      res.json(searchedUsers);
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: err.message });
    }
  },
  async FollowerUsers(req,res){
    try{
      const followers = User.find()
    }
    catch(err){
      res.status(422).json({error:err.message})
    }
  }
};