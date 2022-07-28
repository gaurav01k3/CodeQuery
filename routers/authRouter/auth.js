const express = require("express");
const requireLogin = require('../../middleware/requireLogin');
const { signupController, loginController } = require("../../controller/auth.controller");


const authRouter = express.Router();



//signup
authRouter.post('/signup', signupController);

//login
authRouter.post('/login', loginController)

authRouter.get('/', requireLogin, (req, res) => {
    res.send('helloo')
})


module.exports = authRouter; 