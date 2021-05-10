const passwordHash = require("password-hash")
const { User } = require("../models")

const {
   validation,
} = require("../utils")

const get = async (userId) => {
    const user = await User.findOne({ _id: userId })

    if (!user) throw new Error("User doesn't exist")
    const { name, address, phone } = user
    return { name, address, phone }
}

const update = async ({ userId, name, address, phone }) => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error("User doesn't exist")

    user.name = name
    user.address = address
    user.phone = phone

    await user.save()
    return { _id: userId, name, address, phone }
}

const changePassword = async ({ userId, password, newPassword }) => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error("User doesn't exist")

    const passed = passwordHash.verify(password, user.password)
    if (!passed) throw new Error("Wrong email or password")

    if (!validation.password(newPassword)) throw new Error("Invalid password")

    user.password = passwordHash.generate(newPassword)
    await user.save()
}

module.exports = {
    get,
    update,
    changePassword
}
