const express = require("express");
const { createConversation, getConversation, getAllConversations } = require("../controllers/conversationController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protectedRoute, createConversation);

router.get("/", protectedRoute, getAllConversations);

router.get("/:id", protectedRoute, getConversation);

module.exports = router;