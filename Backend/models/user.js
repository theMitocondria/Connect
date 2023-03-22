// here we will make each items schema inividually and export it

const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter a name"]
    },

    email:{
        type:String,
        required:[true,"Please Enter an email"],
        unique:[true,"Email already exist"],
    },

    password:{
        type:String,
        required:[true,"Please enter a password"],
        minLength:[6,"Password must be strong and greater than 6 char"],
        select:false,
    },

    posts:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Post"
        }
    ],

    followers:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        }
    ],

    
    following:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        }
    ],

    avatar:{
        public_id:String,
        url:String,
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

UserSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }

    next();
})

UserSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateToken=async function(){
    return jwt.sign({_id:this._id},process.env.SECRET_JWT);
}


UserSchema.methods.getResetPassword=async function(){
    const resetToken=crypto.randomBytes(20).toString("hex");

    console.log(resetToken);

    this.resetPasswordToken=resetToken;
    this.resetPasswordExpire=Date.now()+60*60*1000;

    return resetToken;
}
module.exports=mongoose.model("User",UserSchema);