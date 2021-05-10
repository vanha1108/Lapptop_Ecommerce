const randomstring = require("randomstring")
const emailValidator = require("email-validator")
const passwordHash = require("password-hash")
const { User, Order } = require("../models")
const notificationService = require("./notificationService")

const get = async ({ page, limit, search, role }) => {
    const filter =
        !!search && !!search.trim()
            ? { email: { $regex: search, $options: "i" } }
            : {}

    if (role) {
        filter.roles = role
    }

    const total = await User.countDocuments(filter)

    const users = await User.find(filter)
        .collation({ locale: "en" })
        .sort({ name: 1 })
        .skip(page - 1)
        .limit(parseInt(limit))

    return { total, items: users }
}

const getById = async (_id) => {
    const user = await User.findOne({ _id })
    if (!user) throw new Error("User doesn't exist")
    const { name, email, roles, address, phone } = user
    return { name, email, roles, address, phone }
}

const create = async ({ name, email, roles, address, phone }) => {
    const duplicateRecord = await User.findOne({ email })
    if (!!duplicateRecord) throw new Error("Duplicate user email")

    if (!emailValidator.validate(email)) throw new Error("Invalid email")

    const newUser = new User({
        name,
        email,
        roles,
        address,
        phone,
    })

    const password =
        process.env.ENV === "development"
            ? process.env.DEFAULT_PASSWORD
            : randomstring.generate(8)

    newUser.password = passwordHash.generate(password)

    await newUser.save()
    return { _id: newUser._id, name, email, roles, address }
}

const update = async ({ _id, name, email, roles, address, phone }) => {
    const user = await User.findOne({ _id })
    if (!user) throw new Error("User doesn't exist")

    const duplicateRecords = await User.find({ email })
    if (!!duplicateRecords && duplicateRecords.length > 1)
        throw new Error("Duplicate user email")

    if (!emailValidator.validate(email)) throw new Error("Invalid email")

    user.name = name
    user.email = email
    user.roles = roles
    user.address = address
    user.phone = phone

    await user.save()
    return { _id, name, email, roles, address, phone }
}

const remove = async (_id) => {
    const user = await User.findOne({ _id })
    if (!user) throw new Error("User doesn't exist")

    await user.deleteOne({ _id })
}

const getBuyingHistory = async (_id) => {
    const orders = await Order
        .find({ user: _id })
        .sort({ createdAt: -1 })
        .populate("products.product")

    return orders.map(order => ({
        _id: order._id,
        products: order.products,
        totalPrice: order.totalPrice,
        status: order.status,
        isPaid: order.isPaid,
        createdAt: order.createdAt
    }))
}

const getNotifications = async (userId) => {
    return notificationService.get(userId)
} 

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
    getBuyingHistory,
    getNotifications
}
