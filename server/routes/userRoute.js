const express = require("express")

const { auth } = require("../middlewares")

const { userController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Admin"), userController.get)

router.get("/:_id", auth("Admin"), userController.getById)

router.post("/", auth("Admin"), userController.create)

router.put("/:_id", auth("Admin"), userController.update)

router.delete("/:_id", auth("Admin"), userController.remove)

router.get("/customerservice/buyinghistory", auth("Guest"), userController.getBuyingHistory)

router.get("/customerservice/notifications", auth("Guest"), userController.getNotifications)

module.exports = router