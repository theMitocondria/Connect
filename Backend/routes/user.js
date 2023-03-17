const express=require('express');
const {register,login,followUser, logout, UpdatePassword, UpdateProfile, DeleteProfile, Me, GetUserProfile, getAllUsers}=require("../controllers/user");
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
module.exports=router;