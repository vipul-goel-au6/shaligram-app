const Post = require("../models/Post");
const cloudinary = require("cloudinary");
require("../utils/cloudinary");
module.exports = {
  async CreatePost(req, res) {
    try {
      let result;
      if (req.file.mimetype.includes("video")) {
        result = await cloudinary.v2.uploader.upload(req.file.path, {
          resource_type: "video",
          overwrite: true,
        });
      } else {
        result = await cloudinary.v2.uploader.upload(req.file.path);
      }
      const fileUrl = result.secure_url;
      if (!fileUrl) {
        res.status(422).json({ error: "media element is required" });
      }
      const { caption } = req.body;

      await Post.create({
        caption,
        fileUrl,
        postedby: req.user._id,
      });
      res.json({ message: "Uploaded Successfully" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "server error" });
    }
  },
  async GetPosts(_, res) {
    try {
      const allposts = await Post.find()
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .populate("likes.postedby", "_id name userName userDetails.profilePic")
        .sort("-createdAt");
      res.json(allposts);
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "server error" });
    }
  },
  async GetFollowPosts(req, res) {
    try {
      const allposts = await Post.find({
        postedby: { $in: [...req.user.userDetails.following, req.user._id] },
      })
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .populate("likes.postedby", "_id name userName userDetails.profilePic")
        .sort("-createdAt");

      res.json({ posts: allposts });
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "server error" });
    }
  },
  async MyPosts(req, res) {
    try {
      const myposts = await Post.find({ postedby: req.user._id })
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .populate("likes.postedby", "_id name userName userDetails.profilePic")
        .sort("-createdAt");
      res.json({ posts: myposts });
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "server error" });
    }
  },

  async Like(req, res) {
    try {
      const likePost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      )
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .populate("likes.postedby", "_id name userName userDetails.profilePic")
        .exec();
      res.json(likePost);
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  },

  async UnLike(req, res) {
    try {
      const unlikePost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        }
      )
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .populate("likes.postedby", "_id name userName userDetails.profilePic")
        .exec();
      res.json(unlikePost);
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  },

  async Comment(req, res) {
    try {
      const comment = {
        text: req.body.text,
        postedby: req.user._id,
      };
      const commentedPost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { comments: comment },
        },
        {
          new: true,
        }
      )
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .populate("likes.postedby", "_id name userName userDetails.profilePic")
        .exec();
      res.json(commentedPost);
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  },
  async DeletePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.postId })
        .populate("postedby", "_id")
        .exec();
      if (!post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedby._id.toString() === req.user._id.toString()) {
        const deletedPost = await post.remove();
        res.json(deletedPost);
      }
    } catch (err) {
      return res.status(422).json({ error: err.message });
    }
  },

  async EditPost(req, res) {
    try {
      const postId = req.params.postId;
      const caption = req.body.caption;
      const post = await Post.findById(postId)
        .populate("postedby", "_id name userName userDetails.profilePic")
        .populate(
          "comments.postedby",
          "_id name userName userDetails.profilePic"
        )
        .populate("likes.postedby", "_id name userName userDetails.profilePic");
      post.caption = caption;
      await post.save();
      res.json(post);
    } catch (err) {
      return res.status(422).json({ error: err.message });
    }
  },
};
