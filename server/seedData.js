require("dotenv").config()

const mongoose = require("mongoose")
const passwordHash = require("password-hash")

const Category = require("./models/Category")
const Order = require("./models/Order")
const Product = require("./models/Product")
const User = require("./models/User")

const uri = process.env.ATLAS_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const password = passwordHash.generate(process.env.DEFAULT_PASSWORD)

const categories = [
    { name: "Gaming laptop", description: "Laptop for gaming" },
    { name: "Designing laptop", description: "Laptop for designing" },
    { name: "Programming laptop", description: "Laptop for programming" }
]

const products = [
    {
        name: "Macbook Pro 2021",
        description: "Best Apple macbook ever",
        price: 3500,
        quantity: 100,
        images: ["https://loremflickr.com/g/320/240/paris"],
        createdAt: new Date().getTime(),
        cpu: "Core i5 gen 10",
        ram: "16GB",
        hardDisk: "512GB"
    },
    {
        name: "Lenovo Z51 2015",
        description: "Good laptop for students",
        price: 1500,
        quantity: 200,
        images: ["https://loremflickr.com/g/320/240/laptop"],
        createdAt: new Date().getTime(),
        cpu: "Core i7 gen 4",
        ram: "12GB",
        hardDisk: "256GB"
    }
]

const users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password,
        phone: "0123546789",
        address: "Hanoi",
        roles: ["Admin", "Seller", "Technician"]
    },
    {
        name: "Seller",
        email: "seller@gmail.com",
        password,
        phone: "0123546789",
        address: "Hanoi",
        roles: ["Seller"]
    },
    {
        name: "Technician",
        email: "technician@gmail.com",
        password,
        phone: "0123546789",
        address: "Hanoi",
        roles: ["Technician"]
    },
    {
        name: "Guest",
        email: "guest@gmail.com",
        password,
        phone: "0123546789",
        address: "Hanoi",
        roles: ["Guest"]
    }
]

const initData = async () => {
    try {
        console.log("Creating categories...")
        for (const category of categories) {
            const newCateogry = new Category(category)
            await newCateogry.save()
        }
        console.log("Created categories!")

        const category = await Category.findOne({})
        console.log("Creating products...")
        for (const product of products) {
            const newProduct = new Product({
                ...product,
                category: category._id
            })
            await newProduct.save()
        }
        console.log("Created products!")

        console.log("Creating users...")
        for (const user of users) {
            const newUser = new User(user)
            await newUser.save()
        }
        console.log("Created users!")
    } catch (err) {
        console.error(err.message)
    }
}

initData()