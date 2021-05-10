const { userService } = require("../services")

const get = async (req, res) => {
    try {
        const { page, limit, search, role } = req.query
        const data = await userService.get({ page, limit, search, role })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getById = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await userService.getById(_id)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const create = async (req, res) => {
    try {
        const { name, email, address, roles, phone } = req.body
        const data = await userService.create({ name, email, address, roles, phone })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const update = async (req, res) => {
    try {
        const { _id } = req.params
        const { name, email, address, roles, phone } = req.body
        const data = await userService.update({ _id, name, email, address, roles, phone })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const remove = async (req, res) => {
    try {
        const { _id } = req.params
        await userService.remove(_id)
        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getBuyingHistory = async (req, res) => {
    try {
        const { userId } = req
        const data = await userService.getBuyingHistory(userId)
        res.status(200).json(data)
    } catch(err) {
        res.status(400).send(err.message)
    }
}

const getNotifications = async (req, res) => {
    try {
        const { userId } = req
        const data = await userService.getNotifications(userId)
        res.status(200).json(data)
    } catch(err) {
        res.status(400).send(err.message)
    }
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