const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


const requireLogin = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in." })
    }

    const token = authorization.replace("Bearer ", "")

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in." })
        }
    })
    next();
}

module.exports = requireLogin;