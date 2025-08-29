require('dotenv').config()
const { uploadToCloudinary } = require("../config/cloudinary");
const client = require("../config/redis");
const Post = require("../models/post");
const User = require("../models/user");

const profile = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({ message: "UserId not found" });
  }
  const data = await client.get("user");
  if (data) {
    return res.status(200).json(JSON.parse(data));
  }
  try {
    const user = await User.findById(userId)
      .select("-password")
      .populate("posts");
    if (!user) {
      return res.status(404).json("No user found");
    }
    await client.set("user", JSON.stringify(user));
    await client.expire("user", 10);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error Occured" });
  }
};

const handleEditPfp = async (req, res) => {
  const userId = req.body.userId;
  const profile = req.body.profile;
  const image = req.file;
  console.log(userId, profile, image);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    let pfp = null;
    if (image) {
      try {
        pfp = await uploadToCloudinary(image.buffer);
      } catch (err) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }
    await user.updateOne({ bio: profile, profilePic: pfp });
    return res.status(201).json({ message: "Profile updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error occured" });
  }
};

const handleFollow = async (req, res) => {
  const loggedInUserId = req.user._id;
  const userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ message: "No userId" });
  }
  try {
    const userToFollow = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { followers: loggedInUserId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      loggedInUserId,
      { $addToSet: { following: userId } },
      { new: true }
    );

    if (!userToFollow) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const handleUnFollow = async (req, res) => {
  const loggedInUserId = req.user._id;
  const userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ message: "No userId" });
  }

  try {
    const userToUnfollow = await User.findByIdAndUpdate(
      userId,
      { $pull: { followers: loggedInUserId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      loggedInUserId,
      { $pull: { following: userId } },
      { new: true }
    );
    if (!userToUnfollow) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ message: "Unfollowed successfully" });
  } catch (err) {
    return res.status(500);
  }
};

const handleCreatePost = async (req, res) => {
  const { caption } = req.body;
  const image = req.file;
  const userId = req.user._id;
  console.log(image);
  if (!userId || !caption || !image) {
    return res.status(404).json({ message: "All fields required" });
  }

  try {
    let post = null;
    if (image) {
      try {
        post = await uploadToCloudinary(image.buffer);
      } catch (err) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }
    const postUpload = await Post.create({
      author: userId,
      imageUrl: post,
      caption: caption,
    });
    await User.findByIdAndUpdate(userId, {
      $push: { posts: postUpload._id },
    });

    return res.status(201).json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const handleSeePost = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({ message: "PostId required" });
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const handlePostDelete = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;
  if (!userId || !postId) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: postId } },
      { new: true }
    );
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const handleLikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  console.log(postId);
  if (!postId || !userId) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Already liked" });
    }
    post.likes.push(userId);
    post.save();
    return res.status(200).json({ message: "Liked successfuly" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const handleCommentOnPost = async (req, res) => {
  const { userId, postId, text } = req.body;
  if (!userId || !postId || !text) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user: userId,
            text: text,
          },
        },
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Commented" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const handleFeed = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }
  const cacheKey = `posts:${userId}`;
  const data = await client.get(cacheKey);
  if (data) {
    return res.status(200).json(JSON.parse(data));
  }
  try {
    const user = await User.findById(userId).select("-password");
    const followingIds = user.following;
    const posts = await Post.find({
      author: { $in: followingIds },
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("author")
      .populate("comments")
      .populate("likes")
      .populate("shares");

    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    await client.set(cacheKey, JSON.stringify(posts));
    await client.expire(cacheKey, 10);
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Error occured");
  }
};

module.exports = {
  profile,
  handleFollow,
  handleUnFollow,
  handleCreatePost,
  handlePostDelete,
  handleLikePost,
  handleSeePost,
  handleCommentOnPost,
  handleFeed,
  handleEditPfp,
};