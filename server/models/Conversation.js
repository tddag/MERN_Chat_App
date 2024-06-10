const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    users: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message"
    }],
    lastMessageAt: Date
}, {
    timestamps: true
})

module.exports = mongoose.model("Conversation", conversationSchema)