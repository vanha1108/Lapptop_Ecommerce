const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { User, Product } = require("../models")
const orderService = require("../services/orderService")
const { sgMail, generateCheckoutEmail } = require("../utils")

const get = async (userId) => {
    const user = await User.findOne({ _id: userId }).populate("cart.product")

    return user.cart
}

const add = async ({ userId, productId, count }) => {
    const user = await User.findOne({ _id: userId })

    const productIds = user.cart.map((item) => item.product.toString())
    if (productIds.includes(productId)) {
        user.cart = user.cart.map((item) => {
            if (item.product.toString() === productId) {
                return {
                    product: productId,
                    count: item.count + count,
                }
            }

            return {
                product: item.product,
                count: item.count,
            }
        })
    } else {
        user.cart = [...user.cart, { product: productId, count }]
    }

    await user.save()
}

const remove = async ({ userId, productId }) => {
    const user = await User.findOne({ _id: userId })

    user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId,
    )
    await user.save()
}

const checkout = async ({ userId, tokenId }) => {
    const user = await User.findOne({ _id: userId }).populate("cart.product")

    const amount = user.cart.reduce((total, item) => {
        return total + item.product.price * item.count
    }, 0)

    const checkoutInfo = user.cart.map(item => `${item.count} ${item.product.name}`).join(", ")
    const products = user.cart.map(item => ({ count: item.count, _id: item.product._id.toString() }))

    if (!!tokenId) {
        await stripe.charges
            .create({
                amount: amount * 100,
                currency: "usd",
                source: tokenId,
                description: `Checkout at ${new Date().toLocaleDateString()}`,
            })
    }

    const orderInfo = await orderService.create({ products, userId, isPaid: !!tokenId })

    for (const product of products) {
        thisProduct = await Product.findOne({ _id: product._id })
        if (!thisProduct) continue;
        thisProduct.quantity = thisProduct.quantity - product.count
        thisProduct.soldQuantity = thisProduct.soldQuantity + product.count
        thisProduct.save()
    }

    user.cart = []

    const generateEmail = !!tokenId
        ? generateCheckoutEmail.generateCheckoutPaidEmail
        : generateCheckoutEmail.generateCheckoutCODEmail

    await sgMail.send(generateEmail(user.email, amount, checkoutInfo, orderInfo._id))
    await user.save()
}

module.exports = {
    get,
    add,
    remove,
    checkout
}
