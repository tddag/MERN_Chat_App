const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Conversation = require("../models/Conversation");
const { pusherServer } = require("../libs/pusher");

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
            _id: user._id,
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
            _id: user._id,
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
        _id,
        name,
        email
    })
}

// @desc Get All Users
// @route GET /api/users/
const getAllUsers = async (req, res, next) => {
    let users = await User.find().sort({email: 1}).select("-password")
    
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

// @desc broadcastActiveUser
// @route POST /api/users/activeUsers
const broadcastActiveUsers = async (req, res, next) => {
    const { activeUsers } = req.body;
    console.log("TD Request")
    console.log(req.originalUrl)
    console.log(activeUsers)
    if (!activeUsers) {
        res.status(400).json({ message: "Invalid Request"})
        return
    }

    await pusherServer.trigger("activeUsers", "allUsers:active", activeUsers)

    res.status(200).json({ activeUsers });
}

// @desc user active
// @route POST /api/users/:id/active
const userActive = async (req, res, next) => {
    const { id } = req.params;

    console.log("TD Request")
    console.log(req.originalUrl)    
    console.log(id)

    if (!id) {
        res.status(400).json({ message: "Invalid Request"})
        return
    }

    await pusherServer.trigger("activeUsers", "user:active", id)

    res.status(200).json({ id });
}

// @desc user inactive
// @route POST /api/users/:id/inactive
const userInactive = async (req, res, next) => {
    const { id } = req.params;

    console.log("TD Request")
    console.log(req.originalUrl)  
    console.log(id)


    if (!id) {
        res.status(400).json({ message: "Invalid Request"})
        return
    }

    await pusherServer.trigger("activeUsers", "user:inactive", id)

    res.status(200).json({ id });
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

module.exports = { registerUser, 
    loginUser, 
    getUserDetails, 
    getUserConversations, 
    getAllUsers,
    broadcastActiveUsers,
    userActive,
    userInactive
}