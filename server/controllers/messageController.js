

const { pusherServer } = require("../libs/pusher");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// @desc Create Message
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
        await newMessage.populate("seenUsers")
        if (newMessage) {
            let updatedConversation = await Conversation.findById(conversationId);
            updatedConversation.messages.push(newMessage._id);
            updatedConversation.lastMessageAt = new Date();
            updatedConversation.save();

            await pusherServer.trigger(conversationId, 'messages:new', newMessage)

            res.status(201).json(newMessage)
        } else {
            res.status(400).json({ message: "Invalid request"})
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Invalid requuest"})

    }

}


// @desc get message
// @route GET /api/messages/:id
const getMessage = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "Invalid Request"})
        return
    }

    let message = await Message.findById(id).populate("seenUsers")

    if (message) {
        res.status(200).json(message)
    } else {
        res.status(400).json({message: "Message not found!"})
    }
}

// @desc seen message
// @route POST /api/messages/:messageId/seen/:userId
const seenMessage = async (req, res, next) => {
    const { messageId, userId } = req.params;

    if (!messageId || !userId) {
        res.status(400).json({ message: "Invalid Request"})
        return
    }

    const message = await Message.findById(messageId).populate("seenUsers");

    if (message) {
        if (message.seenUsers.includes(userId)) {
            res.status(200).json(message)
        } else {
            message.seenUsers.push(userId)
            message.save()
            await message.populate("seenUsers")
            res.status(200).json(message);
        }

        await pusherServer.trigger(message.conversationId.toString(), 'messages:seen', message)
        console.log("TD-GEt here 2")
    }
}

module.exports = { createMessage, seenMessage, getMessage }