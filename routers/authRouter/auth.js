const express = require("express");
const requireLogin = require('../../middleware/requireLogin');
const { signupController, loginController, getUserByIdController } = require("../../controller/auth.controller");


const authRouter = express.Router();


//signup
authRouter.post('/signup', signupController);

//login
authRouter.post('/login', loginController)

//getuserbyid
authRouter.get('/user-profile/:user_id', getUserByIdController);


module.exports = authRouter; 