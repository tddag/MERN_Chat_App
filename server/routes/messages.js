const express = require("express");
const { createMessage, seenMessage, getMessage } = require("../controllers/messageController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protectedRoute, createMessage);

router.post("/:messageId/seen/:userId", protectedRoute, seenMessage)

router.get("/:id", protectedRoute, getMessage)

module.exports = router;