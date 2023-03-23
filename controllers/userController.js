const {signUpModel} = require('../models/userModel.js');
const jwt = require('../middlewares/jwtAuthentication');
const bcrypt=require('bcrypt');

//Sign Up
const saveSignup = async (req,res) => {
    try{
        const result = await signUpModel.findOne({email:req.body.email});
        req.body.password = bcrypt.hashSync(req.body.password,parseInt(process.env.saltRounds));
        if(result){
            res.status(400).json({statusCode:400,message: "User Already Exists!!"
            });
        }
        else{
            const data = signUpModel(req.body);
            data.token = jwt.generateToken(data._id.toString());
            await data.save();     
            res.status(200).json({ statusCode:200, message: "SignUp Successfully", token: data.token });
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({statusCode:500,messge:"Internal server Error"});
    }
};

//Login
const signin = async(req,res) => {
    try{
        const result=await signUpModel.findOne({email:req.body.email});
        const password=bcrypt.compareSync(req.body.password,result.password);
        if(result && password){
            const token=jwt.generateToken(result._id);
            await signUpModel.updateOne({email:req.body.email},{token});
            res.status(200).json({statusCode:200,"message:":"SignIn Successfully","Token":token});
        }
        else{
            res.status(400).json({statusCode:400,message:"Invalid Username Or Password"});
        }
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"error"});
    }
};

//Update User Date
const updateUser = async (req,res) => {
    try{
         const result = await signUpModel.findByIdAndUpdate({_id:req.body.id},{$set:req.body});
         res.status(200).json({statusCode:200,message:"Updated Successfully"});    
    }
    catch(err)
    {
        res.status(500).json({statusCode:500,message:"Error While Uploading"});
    }
};

//Delete User
const deleteUser = async (req,res) => {
    try{
        const result = await signUpModel.deleteOne({_id:req.body.id});
        if(result.deletedCount){
            res.status(200).json({statusCode:200,message:"Deleted Successfully"});
        }
        else{
            res.json("User is Already Removed");
        }
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"Error While Deleting"});
    }
};

//Show User Data
const showUserProfile = async(req,res) => {
    try{
        const result=await signUpModel.findOne({_id:req.body.id});
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"Error While Fetching User Data"});
    }
};

//Forget Password
const forgetPassword = async(req,res) => {
    try{
        const passcode = parseInt(Math.random()*10000);
        await signUpModel.updateOne({email:req.body.email},{passcode});
        res.status(200).json({statusCode:200,passcode:passcode});
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"Error"});
    }
};

//Reset Password
const verifyOtp = async (req,res) => {
    try{
        const result = await signUpModel.findOne({email:req.body.email});
        if(result){
            const otp = result.passcode;
            if(otp == req.body.otp){
                await signUpModel.updateOne({email:req.body.email},{passcode:0,password:req.body.password});
                res.status(200).json({statusCode:200,message:"Password Changed Successfully.."});
            }
        }
        else{
            res.status(400).json({statusCode:400,message:"User not Exists"});
        }
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"Not a Valid Otp"});
    }
};
module.exports={saveSignup,signin,updateUser,deleteUser,showUserProfile,forgetPassword,verifyOtp};