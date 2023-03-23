const express = require('express');

const joiMiddleware = require('../middlewares/joivalidation');
const userController = require('../controllers/userController');
const jwt = require('../middlewares/jwtAuthentication');

let userRouter = express.Router();

//SignUp 
userRouter.post('/signup', joiMiddleware.signUpValidation, userController.saveSignup);

//SignIn
userRouter.post('/signin', joiMiddleware.signInValidation, userController.signin);

//UserUpdate
userRouter.put('/update',joiMiddleware.updateUserValidation, jwt.verifyToken, userController.updateUser);

//Delete User
userRouter.delete('/delete', jwt.verifyToken, userController.deleteUser);

//Show Profile
userRouter.get('/show', jwt.verifyToken, userController.showUserProfile);

//Forget Password
userRouter.post('/forget',joiMiddleware.forgetValidate,userController.forgetPassword);

//Set New Password
userRouter.post('/new_password',joiMiddleware.setPasswordValidate,userController.verifyOtp);

module.exports = userRouter;
