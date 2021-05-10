const mongoose = require("mongoose")

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    },
    createdAt: {
        type: Number
    }
})

const Notification = mongoose.model("Notification", notificationSchema)

module.exports = Notification