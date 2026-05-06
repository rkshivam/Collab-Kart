require("dotenv").config();
const mongoose = require('mongoose');
async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with collabkart Database");
    }
    catch(error){
        console.log("Error occures :",error);
    }
}

module.exports = connectDB;