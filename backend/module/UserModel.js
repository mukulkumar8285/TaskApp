const mongoose = require("mongoose");

const loginUser = new mongoose.Schema({
    username:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
}, {timestamps : true})

const UserModel  = mongoose.model("UserTask" , loginUser); 
module.exports = UserModel;