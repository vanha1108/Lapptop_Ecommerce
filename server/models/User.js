const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    roles: [{ type: String, enum: ["Admin", "Seller", "Guest", "Technician"] }],
    address: {
        type: String,
    },
    phone: {
        type: String,
        trim: true,
    },
    cart: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            count: { type: Number },
        },
    ],
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
    },
})

const User = mongoose.model("User", userSchema)

module.exports = User
