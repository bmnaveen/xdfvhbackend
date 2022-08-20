const express=require("express");
require("dotenv").config();
const app=express();
const cors=require("cors");
const  connect  = require("./config/db.js");
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT||5000;
const ShorternController =require("./controllers/shortern.controller.js");
const UserController =require("./controllers/user.controller.js");

app.use("",ShorternController)
app.use("/user",UserController)

app.listen(PORT,async()=>{
    try{
        await connect();
        console.log(`port connected on ${PORT}`);
    }catch(err){
        console.log(err.message)
    }
})