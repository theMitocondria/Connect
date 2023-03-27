const express=require('express');
const {register,login,followUser, logout, UpdatePassword, UpdateProfile,ForgottenPassword, DeleteProfile, Me, GetUserProfile, getAllUsers, ResetPassword, GetMyPosts, GetUserPosts}=require("../controllers/user");
const {isAuthenticated}=require("../middlewares/auth");
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuthenticated,followUser);
router.route("/update/password").put(isAuthenticated,UpdatePassword);
router.route("/update/profile").put(isAuthenticated,UpdateProfile);
router.route("/delete").delete(isAuthenticated,DeleteProfile);
router.route("/me").get(isAuthenticated,Me);
router.route("/my/posts").get(isAuthenticated,GetMyPosts);
router.route("/user/:id").get(isAuthenticated,GetUserProfile);
router.route("/userposts/:id").get(isAuthenticated,GetUserPosts);
router.route("/user").get(isAuthenticated,getAllUsers);
router.route("/forgot/password").post(ForgottenPassword);
router.route("/reset/password/:token").put(ResetPassword)
module.exports=router;