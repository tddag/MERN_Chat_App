
// @desc Create Message

const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// @route POST /api/messages
const createMessage = async (req, res, next) => {
    const { message, conversationId, senderId } = req.body;

    if (!message || !conversationId || !senderId) {
        res.status(400).send({ message: "Invalid Request"})
        return
    }

    try {
        const newMessage = await Message.create({
            message,
            conversationId,
            senderId,
            seenUsers: [senderId]
        })
        if (newMessage) {
            let updatedConversation = await Conversation.findById(conversationId);
            updatedConversation.messages.push(newMessage._id);
            updatedConversation.lastMessageAt = new Date();
            updatedConversation.save();

            res.status(201).json({
                id: newMessage._id,
                message,
                conversationId,
                senderId,
                seenUsers: newMessage.seenUsers
            })
        } else {
            res.status(400).json({ message: "Invalid requuest"})
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Invalid requuest"})

    }

}

module.exports = { createMessage }