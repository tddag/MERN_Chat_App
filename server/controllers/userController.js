// @desc Register User
// @route POST /api/users
const registerUser = async (req, res, next) => {
    res.status(200).send({ message: "Regiser User"})
}

// @desc LogIn User
// @route POST /api/users/login
const loginUser = async (req, res, next) => {
    res.status(200).send({ message: "Login User"})
}

// @desc Get User Details
// @route GET /api/users/details
const getUserDetails = async (req, res, next) => {
    res.status(200).send({ message: "Get User Details"})
}

module.exports = { registerUser, loginUser, getUserDetails}