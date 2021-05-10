const { Category } = require("../models")

const get = async ({ page, limit, search }) => {
    const filter =
        !!search && !!search.trim()
            ? { name: { $regex: search, $options: "i" } }
            : {}

    const total = await Category.countDocuments(filter)

    const categories = await Category.find(filter)
        .sort({ name: 1 })
        .skip(page - 1)
        .limit(parseInt(limit))

    return { total, items: categories }
}

const getById = async (_id) => {
    const category = await Category.findOne({ _id })
    if (!category) throw new Error("Category doesn't exist")
    return category
}

const create = async ({ name, description }) => {
    const duplicateRecord = await Category.findOne({ name })
    if (!!duplicateRecord) throw new Error("Duplicate category name")

    const newCategory = new Category({ name, description })
    await newCategory.save()
    return newCategory
}

const update = async ({ _id, name, description }) => {
    const category = await Category.findOne({ _id })
    if (!category) throw new Error("Category doesn't exist")

    category.name = name
    category.description = description

    await category.save()
    return category
}

const remove = async (_id) => {
    const category = await Category.findOne({ _id })
    if (!category) throw new Error("Category doesn't exist")

    await Category.deleteOne({ _id })
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
}
