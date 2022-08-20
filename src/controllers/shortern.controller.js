const Shorten=require("../models/shortern.model.js");
const shortid = require('shortid');
const expres=require("express");
const auth=require("../middleware/auth.js")
const router=expres.Router();

router.post("/",auth,async(req,res)=>{
    
try{
    const shortUrl=shortid.generate();


const final= await Shorten.create({
    shorturl:`http://localhost:5000/${shortUrl}`,
    longurl:req.body.long,
    userid:req.user[0]._id
});

return res.send(final.shorturl)
}catch(err){
  console.log(err)
}


})

router.get("/:short",async(req,res)=>{
    
    try{
     
    
  const final=await Shorten.find({"shorturl":`http://localhost:5000/${req.params.short}`}).lean().exec();
  
  return res.redirect(final[0].longurl);
   

    }catch(err){
      console.log(err)
    }
    
    
    })

    router.post("/mialy",auth,async(req,res)=>{
   
      try{
      
    const final=await Shorten.find({userid:req.user[0]._id}).lean().exec();
    
    return res.status(200).send(final);
  
      }catch(err){
        console.log(err)
      }
      
      
      })
      router.post("/mialy/:id",auth,async(req,res)=>{
   
        try{
       
      const final=await Shorten.find({"_id":req.params.id}).lean().exec();
     
     if(final[0].userid==req.user[0]._id){
await Shorten.findByIdAndDelete(final[0]._id)
res.status(200).send({status:"Sucess"})
     }else{
      res.status(400).send({err:"Acess Denined"})
     }
    
        }catch(err){
          console.log(err)
        }
        
        
        })
module.exports=router;