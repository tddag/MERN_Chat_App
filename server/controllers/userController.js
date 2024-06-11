const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

// @desc Register User
// @route POST /api/users
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).send({ message: "Please add required fields"})
        return;
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400).send({ message: "User already exists"})
        return
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await  bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateJwtToken(user._id)
        })
    } else {
        res.status(400).send({ message: "Invalid User data"})
    }
}

// @desc LogIn User
// @route POST /api/users/login
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send({ message: "Please add required fields"})
        return
    }

    const user = await User.findOne({ email })
    console.log("Get here 1")
    if (user && await bcrypt.compare(password, user.password)) {
        console.log("Get here 2")
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateJwtToken(user._id)
        })
    } else {
        res.status(400).send({ message: "Invalid Credentials"})
    }
}

// @desc Get User Details
// @route GET /api/users/details
const getUserDetails = async (req, res, next) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })
}

// Generate JWT Token
const generateJwtToken = (id) => {
    console.log("TD-private key")
    console.log(process.env.MONGO_URL)
    console.log(process.env.JWT_PRIVATE_KEY)

    return jwt.sign(
        {id},
        process.env.JWT_PRIVATE_KEY,
        {
            expiresIn: '30d',
        }
    )
}

module.exports = { registerUser, loginUser, getUserDetails}