const mongoogse = require("mongoose")
const { Order, Product } = require("../models")
const Pusher = require("pusher")
const { isUndefined } = require("lodash")

const NOTIFICATION = "NOTIFICATION"
const NEW_NOTIFICATION = "NEW_NOTIFICATION"

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
})

const get = async ({ page, limit, isDone, isPaid, search, start, end }) => {
    let filter = {}
    const populateUser = { path: "user", select: "-password" }

    if (isDone !== null && !isUndefined(isDone)) {
        filter.status = JSON.parse(isDone) ? "done" : "waiting"
    }

    if (isPaid !== null && !isUndefined(isPaid)) {
        filter.isPaid = JSON.parse(isPaid)
    }

    if (start && end) {
        filter = {
            ...filter,
            createdAt: {
                $gt: Number(start),
                $lt: Number(end)
            }
        }
    }

    if (!!search && !!search.trim()) {
        populateUser.match = { 
            $or: [
                { email: { $regex: search, $options: "i" } }, 
                { phone: { $regex: search, $options: "i" } }, 
                { name: { $regex: search, $options: "i" }  }
            ]
        }
    }

    const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .populate(populateUser)
        .populate("products.product")

    const total = orders.filter(order => !!order.user).length
    const items = orders
        .filter(order => !!order.user)
        .slice(page - 1, parseInt(limit))

    return { total, items }
}

const getById = async (_id) => {
    const order = await Order
        .findOne({ _id })
        .populate("user", "-password")
        .populate("products.product")
    if (!order) throw new Error("Order doesn't exist")
    return order
}

const create = async ({ userId, products, isPaid }) => {
    const allProducts = await Product.find({
        _id: {
            $in: products.map((item) => mongoogse.Types.ObjectId(item._id)),
        },
    })

    const productIds = allProducts.map((item) => item._id.toString())

    const validatedProducts = products
        .filter((item) => productIds.includes(item._id))
        .map((item) => ({
            product: item._id,
            count: item.count,
        }))

    let totalPrice = 0

    for (const product of validatedProducts) {
        const thisProduct = allProducts.find((item) => item._id.toString() == product.product)
        if (!thisProduct) continue
        if (thisProduct.quantity < product.count)
            throw new Error("Not enough quantity")

        totalPrice += thisProduct.price * product.count
    }

    const now = new Date().getTime()

    const newOrder = new Order({
        user: userId,
        products: validatedProducts,
        createdAt: now,
        updatedAt: now,
        totalPrice,
        status: "waiting",
        isPaid: !!isPaid
    })

    await newOrder.save()
    return newOrder
}

const update = async ({ _id, status }) => {
    const order = await Order
        .findOne({ _id })
        .populate("products.product")

    if (!order) throw new Error("Order doesn't exist")

    order.status = status
    if (status === "done" && !order.isPaid) {
        order.isPaid = true
        for (const item of order.products) {
            const product = await Product.findOne({ _id: item.product._id })
            if (!!product) {
                product.soldQuantity = product.soldQuantity + item.count
                await product.save()
            }
        }
    }
    order.updatedAt = new Date().getTime()

    pusher.trigger(`${NOTIFICATION}-${order.user}`, NEW_NOTIFICATION, "BUYING_HISTORY")

    await order.save()
    return order
}

const remove = async (_id) => {
    const order = await Order.findOne({ _id })
    if (!order) throw new Error("Order doesn't exist")

    await Order.deleteOne({ _id })
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
}
