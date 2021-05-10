const { productService } = require("../services")

const get = async (req, res) => {
    try {
        const { page, limit, search, category, sortBy, isDescending, isMobile = false, isTop = false } = req.query
        let data
        if (isTop) {
            data = await productService.getTopProducts()
        } else {
            data = await productService.get({
                page,
                limit,
                search,
                category,
                isMobile,
                sortBy,
                isDescending
            })
        }
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getById = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await productService.getById(_id)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const create = async (req, res) => {
    try {
        const data = await productService.create(req.body)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const update = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await productService.update({
            _id,
            ...req.body,
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const remove = async (req, res) => {
    try {
        const { _id } = req.params
        await productService.remove(_id)
        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const view = async (req, res) => {
    try {
        const { _id } = req.params
        await productService.view(_id)
        res.sendStatus(200)
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
    view
}
