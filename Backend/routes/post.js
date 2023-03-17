const express=require("express");
const {createPost,LikeAndDislike,DeletePost,getPostOfFollowing, updateCaption}=require("../controllers/post");
const {isAuthenticated}=require("../middlewares/auth");

const router=express.Router();

router.route("/post/upload").post(isAuthenticated,createPost);
router.route("/post/:id").get(isAuthenticated,LikeAndDislike).put(isAuthenticated,updateCaption).delete(isAuthenticated,DeletePost);
router.route("/post").get(isAuthenticated,getPostOfFollowing)
module.exports=router;