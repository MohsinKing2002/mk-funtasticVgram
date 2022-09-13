const express = require('express');
const { createPost, updatePost, likeUnlikePost, makeNupdateComment, deleteComment, deletePost, getPostofFollowings, getPostofUsers, getMyPosts, getSinglePost } = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/authenticate');
const router = express.Router();

/************************************* create new post *********************************************** */
router.route("/new").post(isAuthenticated, createPost);

/************************************* update + like-unlike + delete post *********************************** */
router.route("/post/:id")
    .put(isAuthenticated, updatePost)
    .get(isAuthenticated, likeUnlikePost)
    .delete(isAuthenticated, deletePost);

/******************************** make-update + delete comment on a post ************************************* */
router.route("/post/update/:id").get(isAuthenticated, getSinglePost);

/******************************** make-update + delete comment on a post ************************************* */
router.route("/post/comment/:id")
    .put(isAuthenticated, makeNupdateComment)
    .delete(isAuthenticated, deleteComment);

/******************************** get posts of followings ************************************* */
router.route("/posts").get(isAuthenticated, getPostofFollowings);

/******************************** get my posts ************************************* */
router.route("/me/posts").get(isAuthenticated, getMyPosts);

/******************************** get a user's posts ************************************* */
router.route("/users/:id/posts").get(isAuthenticated, getPostofUsers);

module.exports = router;