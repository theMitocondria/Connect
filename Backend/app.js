const express=require("express");
const cookie=require("cookie-parser");
const app=express();

//using middle ware
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookie());

//to load only if we have not deployed yet iiliye not equal to production
if(process.nextTick.NODE_ENV!=="production"){
     require("dotenv").config({path:"Backend/config/config.env"})
}

// importing routes
const post =require("./routes/post");
const user=require("./routes/user");
app.use("/api/v1",post);
app.use("/api/v1",user);

module.exports=app;