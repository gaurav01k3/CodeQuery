var validator = require("email-validator");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const { findOne } = require("../models/user.model");

const signupController = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ message: 'Please add all the details' });
    }

    //email validation
    if (!validator.validate(email))
        return res.status(422).json({ message: 'Email entered is not valid' });

    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(422).json({
                type: 'email',
                message: "User already exist with this email."
            });
        }

        const hashPassword = await bcryptjs.hash(password, 12);
        const user = new userModel({
            name, email, password: hashPassword
        })
        const data = await user.save();
        res.json({ message: "Registration successfull", data })

    } catch (error) {
        console.log(error);
    }

}


const loginController = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ message: 'Please add all the details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const isMatch = await bcryptjs.compare(password, existingUser.password)
            if (isMatch) {
                const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET
                    , {
                        expiresIn: "120s" // it will be expired after 120s
                    }
                )
                existingUser.password = null;
                return res.status(200).cookie('CQ-token', token).json({ existingUser });
            }
            else
                return res.status(422).json({ message: "The email or password is incorrect." });
        } else {
            return res.status(422).json({ message: "The email or password is incorrect." });
        }

    } catch (error) {
        console.log(error);
    }
}


const getUserByIdController = async (req, res) => {

    const { user_id } = req.params;

    if (!user_id) {
        return res.status(422).json({ message: "Cannot get user!!!" });
    }

    try {
        const user = await userModel.findOne({ _id: user_id });

        res.json(user);

    } catch (error) {
        console.log(error);
    }

}


module.exports = { signupController, loginController, getUserByIdController };