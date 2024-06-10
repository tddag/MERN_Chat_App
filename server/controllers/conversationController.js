const Conversation = require("../models/Conversation");

// @desc Create conversation
// @route POST /api/conversation
const createConversation = async (req, res, next) => {
    const { users } = req.body;

    if (!users) {
        res.status(400).send({ message: "Missing data"})
        return
    }

    const conversationExist = await Conversation.findOne({users})

    if (conversationExist) {
        res.status(200).json(conversationExist)
        return;
    }

    const conversation = await Conversation.create({
        users
    })

    if (conversation) {
        res.status(201).json({
            id: conversation._id,
            users
        })
    } else {
        res.status(400).send({ message: "Failed to create conversation"})
    }
}

// @desc Get Conversation details
// @route GET /api/conversation/:id
const getConversation = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: "Invalid Request"})
        return
    }

    const conversation = await Conversation.findById(id).populate("users").populate("messages");

    if (conversation) {
        res.status(200).json(conversation)
    } else {
        res.status(400).send({ message: "Not found"})
    }

}

module.exports = { createConversation, getConversation }