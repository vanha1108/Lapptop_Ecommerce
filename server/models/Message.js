const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
    },
    text: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    isCustomerMessage: {
        type: Boolean,
        default: false,
    },
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
