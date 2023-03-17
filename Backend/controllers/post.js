const Post=require("../models/post");
const user = require("../models/user");
const User=require("../models/user");

exports.createPost=async(req,res)=>{
    try {
        const newPostData={
            caption:req.body.caption,
            image:{
                public_id:"req.body.public_id",
                url:"req.body.url"
            },
            owner:req.user._id,
        }

        const newPost=await Post.create(newPostData);
        const user=await User.findById(req.user._id);

        user.posts.push(newPost._id);

        await user.save();
        res.status(200).json({
            message:"Post updated",
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.DeletePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        // if post not foiund
        if(!post){
            return res.status(404).json({
                message:"Posr NOt Found",
                success:false
            })
        }

        // if the loginned user try to delted someone else post not allowed
        if(req.user._id.toString()!==post.owner.toString()){
            return res.status(404).json({
                message:"Unauthorized",
                success:false,
            })
        }
     
        // deletinf the post now as we know the user loginned is deleting post itself made by him
        await post.deleteOne();
        
        // deleteing the id of post from the users post array
        const user=await User.findById(req.user._id);
        const index=user.posts.indexOf(req.params.id);
        user.posts.splice(index,1);

        //savinf the changes to use made 
        await user.save();

        // sending response to postman
        res.status(200).json({
            message:"Post Deleted",
            success:true
        })

    } catch (error) {

        // catch error blofg response
       return res.status(400).json({
        message:error.message,
        success:false
       }) 
    }
}

exports.LikeAndDislike=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        if(!post){
            return res.status(400).json({
                message:"No post found",
                success:false
            })
        }
        else{
            if(post.likes.includes(req.user._id)){
               const index=post.likes.indexOf(req.user._id);
               post.likes.splice(index,1);
               
               await post.save();
               res.status(200).json({
                message:"Post Unliked",
                success:true
               })
            }
            else{
                post.likes.push(req.user._id);
                
               await post.save();
               res.status(200).json({
                message:"Post Liked",
                success:true
               })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.getPostOfFollowing=async(req,res)=>{
    try {
        // finding which user is logged in
        const user=await User.findById(req.user._id);

        // finding all the following array members and hence we will se their posts
        const posts=await Post.find({
            owner:{
                // $in:user.following kya krega $in mtlb mongo db ka ek function to find all the matching items from a given array
                $in: user.following
            }
        });

        // now we will return the posts of followed user to logged in user
        res.status(200).json({
            success:true,
            posts

        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.updateCaption=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        if(!post){
            res.status(401).json({
                message:"No post found",
                success:false,
            })
        }

        if(post.owner.toString()!==req.user._id.toString()){
            return res.status(401).json({
                message:"Not allowd",
                success:false
            })
        }

        post.caption=req.body.caption;
        await post.save();

        return res.status(200).json({
            message:"DOne caption",
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}