const express=require('express');
const {register,login,followUser, logout, UpdatePassword, UpdateProfile,ForgottenPassword, DeleteProfile, Me, GetUserProfile, getAllUsers, ResetPassword}=require("../controllers/user");
const {isAuthenticated}=require("../middlewares/auth");
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/follow/:id").get(isAuthenticated,followUser);
router.route("/update/password").put(isAuthenticated,UpdatePassword);
router.route("/update/profile").put(isAuthenticated,UpdateProfile);
router.route("/delete").delete(isAuthenticated,DeleteProfile);
router.route("/me").get(isAuthenticated,Me);
router.route("/user/:id").get(isAuthenticated,GetUserProfile);
router.route("/user").get(isAuthenticated,getAllUsers);
router.route("/forgot/password").post(ForgottenPassword);
router.route("/reset/password/:token").get(ResetPassword)
module.exports=router;