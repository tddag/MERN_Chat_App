const express = require("express");
const { createConversation, getConversation } = require("../controllers/conversationController");

const router = express.Router();

router.post("/", createConversation);
router.get("/:id", getConversation);

module.exports = router;