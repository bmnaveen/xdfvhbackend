const User=require("../models/user.model.js");
const jwt=require("jsonwebtoken");
const expres=require("express");
const bcrypt = require("bcrypt");
const router=expres.Router();
const auth=require("../middleware/auth")
const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
  };
router.post("/signup",async(req,res)=>{
 
try{
    let user;

    user = await User.findOne({ email: req.body.email }).lean().exec();
   if (user) {
     return res.status(400).send({err:"user already exist"});
   }
   const salt = await bcrypt.genSalt(10);
req.body.password=await bcrypt.hash(req.body.password, salt)
user= await User.create(req.body);
const token = newToken(user);
let admin=user.email
console.log(admin)
if(admin.toLowerCase()=="admin@gmail.com"){
 return res.status(200).send({token,auth:"admin"})
}
return res.status(200).send({token});
}catch(err){
    console.log(err);
}

})


router.post("/signin",async(req,res)=>{
    
try{
    let user; 
    user=await User.find({"email":req.body.email});
   if(user.length<=0){
       return res.status(401).send({err:"user does not exist"})
   }
   const validPassword = await bcrypt.compare(req.body.password, user[0].password);
   console.log(validPassword)
   if(!validPassword){
       return res.status(400).send({err:"Invalid password"})
   }
   const token = newToken(user);
    
   let admin=user[0].email
   if(admin.toLowerCase()=="admin@gmail.com"){
    return res.status(200).send({token,auth:"admin"})
   }
   return res.status(200).send({token})
}
    
    
catch(err){
    console.log(err);
}


})
router.post("/",auth,async(req,res)=>{
    
    try{
      if(req.user[0].email=="admin@gmail.com"){
 const user=await User.find({},{'email':1,"_id":0}).lean().exec();
return res.status(200).send(user)
      }else{
        return res.status(400).send("Acess Denined")  
      }
    } catch(err){
        console.log(err);
    }
    
    
    })
module.exports=router;