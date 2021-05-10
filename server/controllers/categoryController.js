const { categoryService } = require("../services")

const get = async (req, res) => {
    try {
        const { page, limit, search } = req.query
        const data = await categoryService.get({ page, limit, search })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getById = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await categoryService.getById(_id)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const create = async (req, res) => {
    try {
        const { name, description } = req.body
        const data = await categoryService.create({ name, description })
        res.status(201).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const update = async (req, res) => {
    try {
        const { _id } = req.params
        const { name, description } = req.body
        const data = await categoryService.update({ _id, name, description })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const remove = async (req, res) => {
    try {
        const { _id } = req.params
        await categoryService.remove(_id)
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