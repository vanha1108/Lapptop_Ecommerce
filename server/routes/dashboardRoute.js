const express = require("express")

const { auth } = require("../middlewares")

const { dashboardController } = require("../controllers")

const router = express.Router()

router.get("/"/*, auth("Admin")*/, dashboardController.get)

module.exports = router
