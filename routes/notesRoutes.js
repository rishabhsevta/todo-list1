const express = require('express');

const jwt = require('../middlewares/jwtAuthentication');
const middlewares = require('../middlewares/joivalidation');
const notesController = require('../controllers/notesController');
const {upload} = require('../middlewares/multer');

const notesRouter = express.Router();

notesRouter.use('/uploads',express.static('./images'));

//Add new Notes
notesRouter.post('/new', upload.single('images'), middlewares.notesSchemaValidate, jwt.verifyToken, notesController.newNotes);

//Show Notes
notesRouter.get('/shownotes', jwt.verifyToken, notesController.showNotes);

//Update Notes
notesRouter.put('/update', upload.single('images'), middlewares.updateSchemaValidation, jwt.verifyToken, notesController.updateNotes);

//Delete Notes
notesRouter.delete('/delete', middlewares.deleteSchemaValidation, jwt.verifyToken, notesController.deleteNotes);

module.exports=notesRouter;
