const mongoose = require("mongoose")

const Schema = mongoose.Schema

const customerGuaranteeOrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    guaranteeDuration: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    storeAddress: {
        type: String
    },
    storePhone: {
        type: String
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    }
})

const CustomerGuaranteeOrder = mongoose.model("CustomerGuaranteeOrder", customerGuaranteeOrderSchema)

module.exports = CustomerGuaranteeOrder