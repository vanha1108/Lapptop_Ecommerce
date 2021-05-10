const mongoose = require("mongoose")

const Schema = mongoose.Schema

const conversationSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    lastMessageTime: { type: Number, required: true, default: 0 },
    lastSeenBySystem: { type: Number, required: true, default: 0 },
    lastSeenByCustomer: { type: Number, required: true, default: 0 }
})

const Conversation = mongoose.model("Conversation", conversationSchema)

module.exports = Conversation
