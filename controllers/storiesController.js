const Stories = require("../models/Stories");
const cloudinary = require("cloudinary");
require("../utils/cloudinary");

module.exports = {
  async CreateStory(req, res) {
    try {
      let result;
      let type;
      if (req.file.mimetype.includes("video")) {
        result = await cloudinary.v2.uploader.upload(req.file.path, {
          resource_type: "video",
          overwrite: true,
        });
        type = "video";
      } else {
        result = await cloudinary.v2.uploader.upload(req.file.path);
        type = "image";
      }
      const fileUrl = result.secure_url;
      if (!fileUrl) {
        res.status(422).json({ error: "media element is required" });
      }
      await Stories.create({
        fileUrl,
        type,
        postedby: req.user._id,
      });
      res.json({ message: "Uploaded Successfully" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "server error" });
    }
  },

  async GetStories(req, res) {
    try {
      const allStories = [];
      const myStories = await Stories.find({
        postedby: req.user._id,
        expiresIn: { $gt: Date.now() },
      }).populate("postedby", "_id name userName userDetails.profilePic");
      myStories.length !== 0 && allStories.push(myStories);
      const stories = await Promise.all(
        req.user.userDetails.following.map((id) =>
          Stories.find({
            postedby: id,
            expiresIn: { $gt: Date.now() },
          }).populate("postedby", "_id name userName userDetails.profilePic")
        )
      );
      allStories.push(...stories);
      res.json(allStories);
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "server error" });
    }
  },
};
