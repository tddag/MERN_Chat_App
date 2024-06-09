const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middleware/authMiddleware")

const { registerUser, loginUser, getUserDetails} = require("../controllers/userController")

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/details", protectedRoute, getUserDetails);

module.exports = router;