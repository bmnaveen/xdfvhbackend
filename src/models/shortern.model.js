const mongoose=require("mongoose");

const shorternSchema=new mongoose.Schema({
    longurl:{type:String},
    shorturl:{type:String},
    userid:{type:String}
})

module.exports=mongoose.model("shorten",shorternSchema)