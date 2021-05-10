const express = require("express")

const { auth } = require("../middlewares")

const { orderController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Admin, Seller"), orderController.get)

router.get("/:_id", auth("Admin, Seller, Guest"), orderController.getById)

router.post("/", auth("Admin, Seller"), orderController.create)

router.put("/:_id", auth("Admin, Seller"), orderController.update)

router.delete("/:_id", auth("Admin, Seller"), orderController.remove)

module.exports = router