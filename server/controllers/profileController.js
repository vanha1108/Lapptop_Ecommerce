const { profileService } = require("../services")

const get = async (req, res) => {
    try {
        const { userId } = req
        const data = await profileService.get(userId)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const update = async (req, res) => {
    try {
        const { userId } = req
        const { name, address, phone } = req.body
        const data = await profileService.update({
            userId,
            name,
            address,
            phone,
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const changePassword = async (req, res) => {
    try {
        const { userId } = req
        const { password, newPassword } = req.body
        const data = await profileService.changePassword({ userId, password, newPassword })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    get,
    update,
    changePassword
}
