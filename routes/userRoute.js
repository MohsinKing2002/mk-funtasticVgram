const express = require('express');
const { register, login, myProfile, logout, updateProfile, deleteProfile, allUsers, singleUser, followUnfollowUser } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authenticate');
const router = express.Router();

/**************** register user ********************* */
router.route("/register").post(register);

/**************** login user ************************* */
router.route("/login").post(login);

/*************** user profile ********************* */
router.route("/me").get(isAuthenticated, myProfile);

/****************** log out user ********************** */
router.route("/me/logout").get(isAuthenticated, logout);

/***************** Update Profile ****************** */
router.route("/me/update").put(isAuthenticated, updateProfile);

/********************** Delete Profile ******************* */
router.route("/me/delete").delete(isAuthenticated, deleteProfile);

/********************** get all users ******************* */
router.route("/users").get(isAuthenticated, allUsers);

/********************** get all users ******************* */
router.route("/users/:id").get(isAuthenticated, singleUser);

/********************** follow / unfollow a user ******************* */
router.route("/follow/:id").get(isAuthenticated, followUnfollowUser);

/********************** get all users ******************* */


module.exports = router;