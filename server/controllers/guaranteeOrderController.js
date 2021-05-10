const { guaranteeOrderService } = require("../services")

const get = async (req, res) => {
    try {
        const { page, limit, status, search, isPaid } = req.query
        const data = await guaranteeOrderService.get({ page, limit, status, search, isPaid })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getById = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await guaranteeOrderService.getById(_id)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getInfo = async (req, res) => {
    try {
        const { orderId, productId } = req.query
        const data = await guaranteeOrderService.getInfo({ orderId, productId })
        res.status(200).json(data)
    } catch(err) {
        res.status(400).send(err.message)
    }
}

const create = async (req, res) => {
    try {
        const { orderId, productId, note } = req.body
        const data = await guaranteeOrderService.create({ orderId, productId, note })
        res.status(201).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const update = async (req, res) => {
    try {
        const { _id } = req.params
        const { note, detail, status, isPaid } = req.body
        const data = await guaranteeOrderService.update({ _id, note, detail, status, isPaid })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const remove = async (req, res) => {
    try {
        const { _id } = req.params
        await guaranteeOrderService.remove(_id)
        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    get,
    getById,
    getInfo,
    create,
    update,
    remove
}