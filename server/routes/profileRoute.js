const express = require("express")

const { auth } = require("../middlewares")

const { profileController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Guest"), profileController.get)

router.put("/", auth("Guest"), profileController.update)

router.put("/password", auth("Guest"), profileController.changePassword)

module.exports = router
