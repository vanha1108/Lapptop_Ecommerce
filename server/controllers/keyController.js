const { keyService } = require("../services")

const getFirebaseKey = async (req, res) => {
    try {
        const data = keyService.getFirebaseKey()
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getFirebaseKey,
}
