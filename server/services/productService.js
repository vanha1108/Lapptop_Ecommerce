const mongoose = require("mongoose")
const { Product } = require("../models")

const get = async ({ page, limit, search, category, isMobile, sortBy, isDescending }) => {
    const filter =
        !!search && !!search.trim()
            ? { name: { $regex: search, $options: "i" } }
            : {}

    if (!!category && !!category.trim()) {
        filter.category = mongoose.Types.ObjectId(category)
    }

    const total = await Product.countDocuments(filter)

    const skip = isMobile ? 0 : page - 1

    let sort = { name: 1 }
    if (sortBy) {
        const order = isDescending === "true" ? -1 : 1
        if (sortBy === "price") {
            sort = { price: order }
        } 
        if (sortBy === "quantity") {
            sort = { quantity: order }
        }
        if (sortBy === "ram") {
            sort = { ram: order }
        }
        if (sortBy === "hardDisk") {
            sort = { hardDisk: order }
        }
        if (sortBy === "name") {
            sort = { name: order }
        }
    }

    console.log(sort)

    const products = await Product.find(filter)
        .collation({ locale: "en" })
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("category")

    return { total, items: products }
}

const getTopProducts = async () => {
    const newestProducts = await Product
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("category")

    const hottestProducts = await Product
        .find()
        .sort({ soldQuantity: -1 })
        .limit(5)
        .populate("category")

    return { newestProducts, hottestProducts }
}

const getById = async (_id) => {
    const product = await Product.findOne({ _id })
    if (!product) throw new Error("Product doesn't exist")
    return product
}

const create = async ({
    name,
    description,
    images,
    price,
    quantity,
    category,
    cpu,
    ram,
    hardDisk,
    vgaCard,
    monitor,
    video,
    guaranteeDuration
}) => {
    const duplicateRecord = await Product.findOne({ name })
    if (!!duplicateRecord) throw new Error("Duplicate product name")

    const data = {
        name,
        description,
        images,
        price,
        quantity,
        category,
        cpu,
        ram,
        hardDisk,
        vgaCard,
        monitor,
        video,
        guaranteeDuration,
        createdAt: new Date().getTime(),
    }

    const newProduct = new Product(data)
    await newProduct.save()
    return newProduct
}

const update = async ({
    _id,
    name,
    description,
    images,
    price,
    quantity,
    category,
    cpu,
    ram,
    hardDisk,
    vgaCard,
    monitor,
    video,
    guaranteeDuration
}) => {
    const product = await Product.findOne({ _id })
    if (!product) throw new Error("Product doesn't exist")

    product.name = name
    product.description = description
    product.images = images
    product.price = price
    product.quantity = quantity
    product.category = category
    product.cpu = cpu
    product.ram = ram
    product.hardDisk = hardDisk
    product.vgaCard = vgaCard
    product.monitor = monitor
    product.video = video
    product.guaranteeDuration = guaranteeDuration

    await product.save()
    return product
}

const remove = async (_id) => {
    const product = await Product.findOne({ _id })
    if (!product) throw new Error("Product doesn't exist")

    await Product.deleteOne({ _id })
}

const view = async (_id) => {
    const product = await Product.findOne({ _id })
    if (!!product) {
        product.viewCount = product.viewCount + 1
        await product.save()
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
    getTopProducts,
    view
}
