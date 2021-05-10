const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            _id: false,
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            count: {
                type: Number
            }
        }
    ],
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["waiting", "done"]
    },
    isPaid: {
        type: Boolean,
        default: false
    }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order