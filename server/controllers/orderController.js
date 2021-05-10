const { orderService } = require("../services")

const get = async (req, res) => {
    try {
        const { page, limit, isDone, isPaid, search, start, end } = req.query
        const data = await orderService.get({ page, limit, isDone, isPaid, search, start, end })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getById = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await orderService.getById(_id)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const create = async (req, res) => {
    try {
        const { userId } = req
        const { products } = req.body
        const data = await orderService.create({ userId, products })
        res.status(201).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const update = async (req, res) => {
    try {
        const { _id } = req.params
        const { status } = req.body
        const data = await orderService.update({ _id, status })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const remove = async (req, res) => {
    try {
        const { _id } = req.params
        await orderService.remove(_id)
        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove
}