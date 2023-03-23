const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'images/');
    },
    filename:function(req,file,cb){
        let date=Date.now().toString();
        const extension=file.originalname.split('.')[1];
        date=date+'.'+extension;
        cb(null,date);
    }});
const fileFilter = (req,file,cb) => {
    const regExp=/jpeg|jpg|png/;
    if(regExp.test(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}; 
const upload = multer({storage:storage,limits:{fileSize:2000000},fileFilter:fileFilter});
module.exports ={upload};