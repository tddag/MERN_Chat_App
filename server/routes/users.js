const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middleware/authMiddleware")

const { registerUser, loginUser, getUserDetails, getUserConversations, getAllUsers, broadcastActiveUsers, userActive, userInactive} = require("../controllers/userController")

router.post("/", registerUser);

router.get("/", protectedRoute, getAllUsers)

router.post("/login", loginUser);

router.get("/details", protectedRoute, getUserDetails);

router.get("/:id/conversations", protectedRoute, getUserConversations)

router.post("/activeUsers", protectedRoute, broadcastActiveUsers)

router.post("/:id/activeUser", protectedRoute, userActive);

router.post("/:id/inactiveUser", protectedRoute, userInactive);

module.exports = router;