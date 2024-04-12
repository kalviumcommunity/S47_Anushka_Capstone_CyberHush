const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    googleID:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});

const userdb=mongoose.model("users",UserSchema);
module.exports = userdb;
