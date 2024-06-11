const express = require("express");
const { createConversation, getConversation, getAllConversations } = require("../controllers/conversationController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createConversation);

router.get("/", protectedRoute, getAllConversations);

router.get("/:id", getConversation);

module.exports = router;