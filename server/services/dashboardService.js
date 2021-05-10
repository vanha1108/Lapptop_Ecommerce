const _ = require("lodash")
const { Product, Order, Category, GuaranteeOrder, User } = require("../models") 

const get = async (startTime, endTime) => {
    const totalProducts = await Product.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalCategories = await Category.countDocuments()
    const totalGuaranteeOrders = await GuaranteeOrder.countDocuments()

    const orders = await Order
        .find({ 
            status: "done",
            createdAt: {
                $gt: Number(startTime),
                $lt: Number(endTime)
            } 
        })
        .populate("products.product")

    const topSale= await Product
        .find()
        .sort({ soldQuantity: -1 })
        .limit(5)

    const topView = await Product
        .find()
        .sort({ viewCount: -1 })
        .limit(5)

    const topGuaranteeProducts = await GuaranteeOrder
        .find({
            createdAt: {
                $gt: startTime,
                $lt: endTime
            }
        })
        .sort({ createdAt: -1 })
        .populate("product")
        .select("product")

    const filterGuaranteeProducts = _.groupBy(topGuaranteeProducts.map(item => item.product), "_id")

    const topGuarantee = Object.values(filterGuaranteeProducts)
        .sort((item1, item2) => item2.length - item1.length)
        .map(item => ({
            _id: item[0]._id, 
            name: item[0].name, 
            guaranteeCount: item.length
        }))
        .slice(0, 5)

    const categories = await Category.find()

    const categoryInformation = categories.map(category => ({
        _id: category._id.toString(),
        name: category.name,
        sale: 0,
        revenue: 0
    }))

    const products = orders.map(order => order.products).flat()
    const categoryProducts = _.groupBy(products, "product.category")

    for (const key of Object.keys(categoryProducts)) {
        const soldProducts = categoryProducts[key]
        const sale = _.sumBy(soldProducts, "count")
        const revenue = _.sumBy(soldProducts, item => item.product.price * item.count)
        const thisCategory = categoryInformation.find(category => category._id == key)
        if (thisCategory) {
            thisCategory.sale = sale
            thisCategory.revenue = revenue
        }
    }

    const totalSale = _.sumBy(categoryInformation, item => item.sale)
    const totalRevenue = _.sumBy(categoryInformation, item => item.revenue)

    return {
        topSale,
        topView,
        topGuarantee,
        categoryInformation,
        totalSale,
        totalRevenue,
        totalCategories,
        totalGuaranteeOrders,
        totalOrders,
        totalProducts,
        totalUsers
    }
}

module.exports = {
    get
}