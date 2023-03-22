const User=require("../models/user");
const Post = require("../models/post");
const {sendEmail}=require("../middlewares/sendMail");
exports.register=async(req,res)=>{

    try {
        const {name,email,password}=req.body;

        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }

        user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:req.body.public_id,
                url:"hbrhbf"
            }
        })

        res.status(201).json({
            success:true,
            user:true
        })
        
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}


exports.login=async (req,res)=>{

    try {
        const {email,password}=req.body;
        const user= await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not registered"
            });
        }

        const isMatch= await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Wrong Password"
            });
        }

        const token=await user.generateToken();
        const objectREq={
            expires:new Date(Date.now()+10*24*60*60*1000),
            httpOnly:true
        }
        res.status(201).cookie("token",token,objectREq).json({
            success:true,
            user,
            token,
        })
        
        

    } catch (error) {
        res.status(500).json({
           success:false,
           message:error.message
        });
    }
}


exports.logout=async(req,res)=>{
    const objectREq={
        expires:new Date(Date.now()),
        httpOnly:true
    }
    try {
        res.status(200).cookie("token",null,objectREq).json({
            message:"Logged Out",
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

exports.followUser=async(req,res)=>{
   try {
    const UserToFollow=await User.findById(req.params.id);
    const loggedInUser=await User.findById(req.user._id);

    // if user which we are providing id to folllow does not exist
    if(!UserToFollow){
        return res.status(404).json({
            message:"Userdoes not exist",
            success:false
        })
    }

    // // if user id we provided whom we follow already and press the follow button again then unfoolllow ho jaega
    if(loggedInUser.following.includes(req.params.id)){
        const index=loggedInUser.following.indexOf(req.params.id);
        loggedInUser.following.splice(index,1);

        const index1=UserToFollow.followers.indexOf(req.body._id);
        UserToFollow.followers.splice(index1,1);
        
        await loggedInUser.save();
        await UserToFollow.save();

        res.status(200).json({
            message:"Unfollowed",
            success:true
        })
    }

    else{
        //pushing follower andd followinfg array
        UserToFollow.followers.push(req.user._id);
        loggedInUser.following.push(req.params.id);

        await loggedInUser.save();
        await UserToFollow.save();

        res.status(200).json({
            message:"Followed successfull",
            success:true
        })
    }

   } catch (error) {
    return res.status(500).json({
        message:error.message,
        success:false
    })
   }
}


exports.UpdatePassword=async(req,res)=>{
    try {
        // finding user whose passwprd is going to be updated
        const user=await User.findById(req.user._id).select("+password");

        //taking the old and new password
        const {oldPassword,newPassword}=req.body;
        
        if(!oldPassword ||  !newPassword){
            return res.status(404).json({
                message:"empty fields",
                success:false
            })
        }
        else{
            //matching if ols password was given right from db
            const isMatch = await user.matchPassword(oldPassword);

            if(!isMatch){
                res.status(401).json({
                    message:"wrong password",
                    success:false,
                })
            }

            user.password=newPassword;
            await user.save();

            res.status(200).json({
                message:"password updated",
                success:true,
            })

        }
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

exports.UpdateProfile=async(req,res)=>{
    // finding user
    try {
        const user=await User.findById(req.user._id);

        const {name,email}=req.body;

        if(name){
            user.name=name;
        }
        
        if(email){
            user.email=email;
        }

        await user.save();

        res.status(200).json({
            message:"profile updated",
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}


exports.DeleteProfile=async (req,res)=>{
    try {

       
    const user = await User.findById(req.user._id);
    const posts = user.posts;

    await user.deleteOne();

   //logout user after deleting profile

    for(let i = 0; i<posts.length; i++){
      const post = await Post.findById(posts[i]);
      await post.deleteOne();
    }

    res.status(200)
    .cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    .json({
      success: true,
      message: 'User deleted successfully'
    })

    
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}


exports.Me=async (req,res)=>{
    try {
        const user=await User.findById(req.user._id).populate("posts");

        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

exports.GetUserProfile=async(req,res)=>{
    try {

        const user=await User.findById(req.params.id).populate("posts");

        if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false,
            })
        }else{

            res.status(200).json({
                success:true,
                user
            })
        }
        
    } catch (error) {
       res.status(500).json({
        message:error.message,
        success:false
       }) 
    }
}


exports.getAllUsers=async (req,res)=>{
    try {
        const user=await User.find({});
        if(!user){
            return res.status(404).json({
                message:"No user present",
                success:false,
            })
        }

        res.status(200).json({
            message:"happy",
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })  
    }
}

exports.ForgottenPassword=async(req,res)=>{
    try {

        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({
                message:"No user found",
                success:false,
            })
        }

        const resetPassword= user.getResetPassword();

        await user.save();

        const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPassword}`;
        const message1=`Reset your password by clicking on the link below${resetUrl}`;

        try {
            await sendEmail({
                email:user.email,
                subject:"Reset Password",
                message1,
            })

            return res.status(200).json({
                success:true,
                message:"mail send sucessfullu"
            })
        } catch (error) {
            user.resetPasswordExpire=undefined;
            user.resetPasswordToken=undefined;

            await user.save();

            return res.status(500).json({
                message:error.message,
                success:false
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })  
    }
}

exports.ResetPassword=async(req,res)=>{
    try {
        const resetPasswordToken=req.params.token;

        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        })
        
        if(!user){
        
            return res.status(400).json({
                message:"Expired token or invalid ",
                success:false,
            })
        } 
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save();

        return res.status(200).json({
            message:"Password Updated",
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })  
    }
}