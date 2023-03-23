const {notesModel}=require('../models/notesModel.js');
const {signUpModel} = require('../models/userModel');
//create new notes
const newNotes = async(req,res) => {
    try{
        const userEmail = await signUpModel.findOne({_id:req.body.id},{email:1});
        const body = req.body;
        delete body.id;
        body.email = userEmail.email;
        if(req.file){body.attachment = req.file.path;}
        else{body.attachment=null;}
        const data = new notesModel(body);
        await data.save();
        res.status(200).json({statusCode:200,message:"Created Successfully"});
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"Error While Uploading"});
    }
};

//show Notes
const showNotes = async (req,res) => { 
    try{
        const data = await notesModel.find({email:req.body.email});
        res.status(200).json({statusCode:200,Data:data});
    }
    catch(err){
        res.status(500).json({estatusCode:500,message:"Error While Fetching"});
    }
};

//Update Notes
const updateNotes = async (req,res) => {
    try{
        if(req.file){req.body.attachment = req.file.path;}
        else{req.body.attachment=null;}
        delete req.body.id;
        console.log(req.body);
        await notesModel.findByIdAndUpdate({_id:req.body._id},{$set:req.body});
        res.json({statusCode:200,message:"Updated Successfully"});
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"Error While Updating"});
    }
};

//Delete Notes
const deleteNotes = async (req,res) => {
    try{
        await notesModel.deleteOne({_id:req.body._id});
        res.status(200).json({statusCode:200,message:"Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({statusCode:500,message:"Error While Deleting"});
    }
};
module.exports = {newNotes, showNotes, updateNotes, deleteNotes};