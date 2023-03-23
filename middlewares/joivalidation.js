const joi = require('joi');

const validate = (result,res,next) => {
    if(!result.error){
        next();
    }
    else{
        res.status(400).json(result.error.message);
    }
};

//Schema for SIGNUP
const signUpSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    mobile: joi.string().regex(/^[0-9]{10}$/).required()
});

// SIGNUP VALIDATION
const signUpValidation = (req,res,next) => {
    const result=signUpSchema.validate(req.body);
    validate(result,res,next);
};

//Schema for SIGNIN
const signInSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});

//SIGNIN VALIDATION
const signInValidation = (req,res,next) => {
    const result=signInSchema.validate(req.body);
    validate(result,res,next);
};

//NOTES SCHEMA
const notesSchema = joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    category:joi.string().lowercase().valid('work','grocery','workout','hobby').required(),
    startdate:joi.date().required(),
	enddate:joi.date().required()
});

//Validate Notes Schema
const notesSchemaValidate = (req,res,next) => {
    const result=notesSchema.validate(req.body);
    validate(result,res,next);
};

//Schema for Updation of notes
const updateSchema = joi.object({
    title:joi.string(),
    description:joi.string(),
    category:joi.string().lowercase().valid('work','grocery','workout','hobby'),
    _id:joi.string().required()
});
const updateSchemaValidation = (req,res,next) => { 
    const result=updateSchema.validate(req.body);
    validate(result,res,next);
};

//Schema for Deletion
const deleteSchema = joi.object({
    id:joi.string().required()
});
const deleteSchemaValidation = (req,res,next) => {
    const result=deleteSchema.validate(req.body);
    validate(result,res,next); 
};

//Schema for User Update
const updateUser = joi.object({
    name:joi.string().min(4),
    password:joi.string().min(6),
    mobile:joi.string().regex(/^[0-9]{10}$/)
});
const updateUserValidation = (req,res,next) => {
    const result=updateUser.validate(req.body);
    validate(result,res,next);
};

//Schema for Forget Password
const forget = joi.object({
    email:joi.string().email().required(),
});
const forgetValidate = (req,res,next) => {
    const result=forget.validate(req.body);
    validate(result,res,next);
};

//Schema For new Password
const setPassword = joi.object({
    password:joi.string().min(6).required(),
    email:joi.string().email().required(),
    otp:joi.number().required()
});
const setPasswordValidate =(req,res,next) => {
    const result=setPassword.validate(req.body);
    validate(result,res,next);
};

module.exports={signUpValidation, signInValidation, notesSchemaValidate, updateSchemaValidation, deleteSchemaValidation,updateUserValidation,forgetValidate,setPasswordValidate};
