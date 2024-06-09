const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectedRoute = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const tokenPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

            // store user object in req for next middleware
            req.user = await User.findById(tokenPayload.id).select('-password');

            next();
        } catch (e) {
            console.log(e)
            res.status(401).send({ message: "Not Authorized"})
            return
        }
    }
    if (!token) {
        res.status(401).send({ message: "Not Authorized, no token"})
    }
}

module.exports = { protectedRoute }