const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Conversation = require("../models/Conversation");

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
    if (user && await bcrypt.compare(password, user.password)) {
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

// @desc Get All Users
// @route GET /api/users/
const getAllUsers = async (req, res, next) => {
    let users = await User.find().sort({email: 1})
    
    if (users) {
        res.status(200).json({ users: users})
    } else {
        res.status(400).json({ message: "Invalid Request"})
    }
}


// @desc Get User Conversations
// @route GET /api/users/:id/conversations
const getUserConversations = async (req, res, next) => {
    const userId = req.params.id;

    if (!userId) {
        res.status(400).json({ message: "UserId is required"})
    } else {
        let conversations = await Conversation.find({ users: {$in: [userId]}}).populate("users")

        if (conversations) {
            res.status(200).json({ conversations: conversations})
        } else {
            res.status(400).json({ conversations: []})
        }
    }
}

// Generate JWT Token
const generateJwtToken = (id) => {

    return jwt.sign(
        {id},
        process.env.JWT_PRIVATE_KEY,
        {
            expiresIn: '30d',
        }
    )
}

module.exports = { registerUser, loginUser, getUserDetails, getUserConversations, getAllUsers}