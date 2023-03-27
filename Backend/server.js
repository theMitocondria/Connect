const app=require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary=require("cloudinary");
cloudinary.config({
    cloud_name:process.env.ClOUD_NAME,
    api_key:process.env.ClOUD_KEY,
    api_secret:process.env.ClOUD_SECRET,
})
connectDatabase();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})