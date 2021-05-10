const { cartService } = require("../services")

const get = async (req, res) => {
    try {
        const { userId } = req
        const data = await cartService.get(userId)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const add = async (req, res) => {
    try {
        const { userId } = req
        const { productId, count } = req.body
        const data = await cartService.add({userId, productId, count})
        res.status(201).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const remove = async (req, res) => {
    try {
        const { userId } = req
        const { productId } = req.params
        await cartService.remove({userId, productId})
        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const checkout = async (req, res) => {
    try {
        const { userId } = req
        const { tokenId } = req.body
        await cartService.checkout({ userId, tokenId })
        res.sendStatus(200)
    } catch(err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    get,
    add,
    remove,
    checkout
}