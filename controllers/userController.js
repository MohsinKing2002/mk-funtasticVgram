const User = require("../models/userSchema");
const Post = require("../models/postSchema");
const cloudinary = require("cloudinary");

/************************************* register user *********************************************** */
exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists !!!",
      });
    }

    let myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "funtasticVgram_users",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    let token = await user.genarateToken();
    let options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      message: "User Registered !!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* login user *********************************************** */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "User not found !!",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid login credentials !!",
      });
    }

    const token = await user.genarateToken();

    let options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      message: "User Logged in !!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* user profile *********************************************** */
exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers followings"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* register user *********************************************** */
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    let options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.status(200).cookie("token", null, options).json({
      success: true,
      message: "User logged out !!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* update profile *********************************************** */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (avatar) {
      //removing old avatar
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      //adding new avatar
      let myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "funtasticVgram_users",
      });
      (user.avatar.public_id = myCloud.public_id),
        (user.avatar.url = myCloud.secure_url);
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated !!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* Delete profile *********************************************** */
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { password } = req.body;

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid login credentials !!",
      });
    }

    const posts = user.posts;
    const followers = user.followers;
    const followings = user.followings;
    const userId = user._id;

    await user.remove();

    //after delete loggin out user
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    //delete all posts of user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await post.remove();
    }

    //deleting from followers followings
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.followings.indexOf(userId);
      follower.followings.splice(index, 1);

      await follower.save();
    }

    //deleting from followings followers
    for (let i = 0; i < followings.length; i++) {
      const following = await User.findById(followings[i]);

      const index = following.followers.indexOf(userId);
      following.followers.splice(index, 1);

      await following.save();
    }

    //deleting all comments and likes of the user
    const allPosts = await Post.find();
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);
      //deleting comments
      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user.toString() == userId.toString()) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();

      //deleting all likes
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);

      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "User Deleted !!!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* get a single User *********************************************** */
exports.singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers followings"
    );
    if (!user) {
      return res.status(400).json({
        message: `No user found with id : ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* follow a user *********************************************** */
exports.followUnfollowUser = async (req, res) => {
  try {
    const me = await User.findById(req.user._id);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `No user found with id: ${req.params.id}`,
      });
    }

    //check if already followed
    if (user.followers.includes(me._id)) {
      // delete from user's followers
      let index = user.followers.indexOf(me._id);
      user.followers.splice(index, 1);
      await user.save();

      //deleting from me's followings
      index = me.followings.indexOf(user._id);
      me.followings.splice(index, 1);
      await me.save();

      res.status(200).json({
        success: true,
        message: "User unfollowed !!",
      });
    } else {
      //adding into user's followers
      user.followers.push(me._id);
      await user.save();

      //adding into me's followings
      me.followings.push(user._id);
      await me.save();

      res.status(200).json({
        success: true,
        message: "User followed !!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/************************************* get All Users *********************************************** */
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
