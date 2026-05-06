const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Member"],
        default:"Member"
    }
},{timestamps:true})

const User = mongoose.model("User",userschema);
module.exports = User;