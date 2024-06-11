const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middleware/authMiddleware")

const { registerUser, loginUser, getUserDetails, getUserConversations, getAllUsers} = require("../controllers/userController")

router.post("/", registerUser);

router.get("/", protectedRoute, getAllUsers)

router.post("/login", loginUser);

router.get("/details", protectedRoute, getUserDetails);

router.get("/:id/conversations", protectedRoute, getUserConversations)

module.exports = router;