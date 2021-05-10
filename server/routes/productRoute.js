const express = require("express")

const { auth } = require("../middlewares")

const { productController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Admin, Guest"), productController.get)

router.get("/:_id", auth("Admin, Guest"), productController.getById)

router.post("/", auth("Admin"), productController.create)

router.put("/:_id", auth("Admin"), productController.update)

router.delete("/:_id", auth("Admin"), productController.remove)

router.get("/view/:_id", auth("Guest"), productController.view)

module.exports = router
