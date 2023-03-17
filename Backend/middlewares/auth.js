// first tkae the user model and jwt token
const User=require("../models/user");
const jwt=require("jsonwebtoken");

exports.isAuthenticated=async(req,res,next)=>{
    try {
        // find the token in the cookie

        const {token}=req.cookies;

        if(!token){
            return res.status(400).json({
                    message:"please Login FIrst"
                })
        }
    

        // now decode the token using your secret key and also use await
        const decoded=await jwt.verify(token,process.env.SECRET_JWT);
        
        
        // save user data
        req.user=await User.findById(decoded._id);

        next();

    } catch (error) {

        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}