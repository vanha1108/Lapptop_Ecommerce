const { dashboardService } = require("../services")

const get = async (req, res) => {
    try {
        const { startTime, endTime } = req.query
        const data = await dashboardService.get(startTime, endTime)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    get
}