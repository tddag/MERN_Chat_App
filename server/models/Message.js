const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    seenUsers: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }],
    conversationId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    senderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        requried: true
    }  
}, {
    timestamps: true
})

module.exports = mongoose.model("Message", messageSchema);