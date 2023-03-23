const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    email:String,
    title:String,
    description:String,
    attachment:String,
    category:String,
    startdate:{type: Date},
	enddate: {type: Date},
},{versionKey:false,timestamps:true});

const notesModel = new mongoose.model('notes',notesSchema);

module.exports = {notesModel};


