const mongoose=require("mongoose");

const connect=()=>{
    return mongoose.connect(process.env.ADMIN_ID);
}

module.exports = connect;