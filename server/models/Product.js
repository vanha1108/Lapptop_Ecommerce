const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String
    },
    images: [{
        _id: false,
        type: String
    }],
    price: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    soldQuantity: {
        type: Number,
        required: true,
        default: 0
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
    cpu: {
        type: String
    },
    ram: {
        type: String
    },
    hardDisk: {
        type: String
    },
    vgaCard: {
        type: String
    },
    monitor: {
        type: String
    },
    video: {
        type: String
    },
    guaranteeDuration: {
        type: Number,
        required: true,
        default: 6
    },
    viewCount: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product