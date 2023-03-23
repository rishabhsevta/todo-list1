const jwt = require('jsonwebtoken');
const {signUpModel} = require('../models/userModel.js');
const generateToken = (id) => {
    return jwt.sign({_id:id},process.env.secretKey,{algorithm:"HS256"});
};
const verifyToken = async (req,res,next) => {
    try{
    const value = jwt.verify(req.headers.token,process.env.secretKey);  
    const result = await signUpModel.findOne({_id:value._id,token:req.headers.token});
    if(result){
    req.body.id = value._id;
    next();
   }
    else{
        throw new Error("error");
    }
    }
    catch(err){
        res.json("UnAuthorized User");
    }
};
module.exports = {generateToken,verifyToken};
