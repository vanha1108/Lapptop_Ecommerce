const { isUndefined } = require("lodash")
const sumBy = require("lodash/sumBy")
const { GuaranteeOrder, Order } = require("../models")
const notificationService = require("./notificationService")

const GUARANTEE_ORDER_STATUS = {
    RECEIVED: "Received",
    FIXING: "Fixing",
    RETURNED_TO_CUSTOMER: "Returned to customer"
}

const get = async ({ page, limit, status, search, isPaid }) => {
    const filter = {  }
    if (!!status) {
        filter.status = status
    }
    if (isPaid !== null && !isUndefined(isPaid)) {
        filter.isPaid = JSON.parse(isPaid)
    }
    const populateUser = { path: "user", select: "_id name email phone" }
    const populateProduct = { path: "product", select: "_id name" }

    if (!!search && !!search.trim()) {
        populateUser.match = { 
            $or: [
                { email: { $regex: search, $options: "i" } }, 
                { phone: { $regex: search, $options: "i" } }, 
                { name: { $regex: search, $options: "i" }  }
            ]
        }
    }

    const guaranteeOrders = await GuaranteeOrder.find(filter)
        .sort({ createdAt: -1 })
        .populate(populateUser)
        .populate(populateProduct)

    const total = guaranteeOrders.filter(order => !!order.user).length
    const items = guaranteeOrders
        .filter(order => !!order.user)
        .slice(page - 1, parseInt(limit))

    return { total, items }
}

const getById = async (_id) => {
    const guaranteeOrder = await GuaranteeOrder
        .findOne({ _id })
        .populate({ path: "user", select: "_id name email phone" })
        .populate({ path: "product", select: "_id name" })
    if (!guaranteeOrder) throw new Error("GuaranteeOrder doesn't exist")
    return guaranteeOrder
}

const getInfo = async ({ orderId, productId }) => {
    const order = await Order
        .findOne({ _id: orderId })
        .populate("products.product")
        .populate("user", "-password")
    if (!order) throw new Error("Order doesn't exist")

    const product = order.products.find(item => item.product._id.toString() === productId)
    if (!product) throw new Error("Product doesn't exist")

    return {
        orderId: order._id,
        createdAt: order.createdAt,
        product: {
            _id: product.product._id,
            name: product.product.name,
            guaranteeDuration: product.product.guaranteeDuration
        },
        guaranteeServiceOn: checkGuaranteeServiceStatus(order.createdAt, product.product.guaranteeDuration),
        user: {
            _id: order.user._id,
            name: order.user.name,
            email: order.user.email,
            phone: order.user.phone
        }
    }
}

const checkGuaranteeServiceStatus = (orderCreateTime, productguaranteeDuration) => {
    const guaranteeDuration = productguaranteeDuration * 30 * 24 * 60 * 60 * 1000
    const guaranteeServiceOn = new Date().getTime() - orderCreateTime < guaranteeDuration
    return guaranteeServiceOn
}

const create = async ({ orderId, productId, note }) => {
    const order = await Order.findOne({ _id: orderId }).populate("products.product")
    if (!order) throw new Error("Order doesn't exist")
    const product = order.products.find(item => item.product._id.toString() == productId)
    if (!product) throw new Error("Product doesn't exist")

    const newGuaranteeOrder = new GuaranteeOrder({
        order: order._id,
        user: order.user,
        product: productId,
        createdAt: new Date().getTime(),
        note,
        status: GUARANTEE_ORDER_STATUS.RECEIVED,
        detail: [],
        guaranteeServiceOn: checkGuaranteeServiceStatus(order.createdAt, product.product.guaranteeDuration)
    })

    await notificationService.create({ userId: order.user, text: `An admin created your guarantee order for ${product.name}` })

    await newGuaranteeOrder.save()
    return newGuaranteeOrder
}

const update = async ({ _id, note, detail, status, isPaid }) => {
    const guaranteeOrder = await GuaranteeOrder.findOne({ _id }).populate("product")
    if (!guaranteeOrder) throw new Error("GuaranteeOrder doesn't exist")

    guaranteeOrder.note = note
    guaranteeOrder.detail = detail.map(item => ({
        content: item.content,
        price: item.price
    }))
    guaranteeOrder.totalPrice = sumBy(detail, "price")
    guaranteeOrder.status = status
    guaranteeOrder.isPaid = isPaid

    await notificationService.create({ userId: guaranteeOrder.user, text: `An admin update your guarantee order for ${guaranteeOrder.product.name}` })

    await guaranteeOrder.save()
    return guaranteeOrder
}

const remove = async (_id) => {
    const guaranteeOrder = await GuaranteeOrder.findOne({ _id }).populate("populate")
    if (!guaranteeOrder) throw new Error("GuaranteeOrder doesn't exist")

    await notificationService.create({ userId: order.user, text: `An admin remove your guarantee order for ${guaranteeOrder.product.name}` })

    await GuaranteeOrder.deleteOne({ _id })
}

module.exports = {
    get,
    getById,
    getInfo,
    create,
    update,
    remove,
}
