const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const cloudinary = require("cloudinary");

/************************************* create post *********************************************** */
exports.createPost = async (req, res) => {
  try {
    let myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "funtasticVgram",
    });

    const postData = {
      caption: req.body.caption,
      owner: req.user._id,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    const post = await Post.create(postData);

    //saving in user's posts array
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created !!!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* POST UPDATE *********************************************** */
exports.updatePost = async (req, res) => {
  try {
    const { newCaption } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "This post is not found !!",
      });
    }

    if (newCaption) {
      post.caption = newCaption;
    }

    await post.save();

    res.status(200).json({
      message: "Post Updated !!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* like or unlike post *********************************************** */
exports.likeUnlikePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: `Post not found with id: ${req.params.id}`,
      });
    }

    //checking if already liked
    if (post.likes.includes(user._id)) {
      //remove user from likes array
      let index = post.likes.indexOf(user._id);
      post.likes.splice(index, 1);

      await post.save();

      res.status(200).json({
        success: true,
        message: "Post Unliked !!",
      });
    } else {
      //add user into likes array
      post.likes.push(user._id);
      await post.save();

      res.status(200).json({
        success: true,
        message: "Post liked !!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/******************************* do comment/update comment in a post ****************************** */
exports.makeNupdateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: `Post not found with id: ${req.params.id}`,
      });
    }
    const commentData = {
      user: req.user._id,
      comment: req.body.comment,
    };

    //check if already commented then update comment
    let index = -1;
    post.comments.forEach((item, i) => {
      if (item.user.toString() == req.user._id.toString()) {
        index = i;
      }
    });

    if (index != -1) {
      post.comments[index].comment = commentData.comment;

      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment updated !!",
      });
    } else {
      post.comments.push(commentData);

      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment Added !!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**************************************** delete comment ************************************************/
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: `Post not found with id: ${req.params.id}`,
      });
    }

    post.comments.forEach((item, index) => {
      if (item.user.toString() == req.user._id.toString()) {
        return post.comments.splice(index, 1);
      }
    });

    await post.save();
    res.status(200).json({
      success: true,
      message: "Comment Deleted !!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*************************************** delete  post *************************************** */
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!post) {
      return res.status(404).json({
        message: `Post not found with id: ${req.params.id}`,
      });
    }

    if (post.owner.toString() != user._id.toString()) {
      return res.status(401).json({
        message: "Unathorized action !!",
      });
    }
    let index = user.posts.indexOf(post._id);
    user.posts.splice(index, 1);

    await user.save();
    await post.remove();
    res.status(200).json({
      message: "Post deleted !!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* get posts of followings *********************************************** */
exports.getPostofFollowings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      owner: {
        $in: user.followings,
      },
    }).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      posts: posts.sort((a, b) => 0.5 - Math.random()),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* get single post *********************************************** */
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: `No post found !!`,
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* get my posts *********************************************** */
exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* get posts of a user *********************************************** */
exports.getPostofUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user found with id: ${req.params.id}`,
      });
    }
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
