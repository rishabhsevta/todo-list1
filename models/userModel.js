const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    mobile:{type:String,required:true},
    passcode:{type:Number,default:0}, 
    token:String
},{versionKey:false,timestamps:true});

const signUpModel = new mongoose.model('signUp',signUpSchema);

module.exports = {signUpModel};
