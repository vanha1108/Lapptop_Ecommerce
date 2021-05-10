const mongoose = require("mongoose")

const Schema = mongoose.Schema

const guaranteeOrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    guaranteeServiceOn: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
    note: {
        type: String
    },
    detail: [
        {
            _id: false,
            content: { type: String },
            price: { type: Number }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ["Received", "Fixing", "Returned to customer"]
    },
    isPaid: {
        type: Boolean,
        default: false
    }
})

const GuaranteeOrder = mongoose.model("GuaranteeOrder", guaranteeOrderSchema)

module.exports = GuaranteeOrder