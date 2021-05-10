const express = require("express")

const { auth } = require("../middlewares")

const { categoryController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Admin, Guest"), categoryController.get)

router.get("/:_id", auth("Admin"), categoryController.getById)

router.post("/", auth("Admin"), categoryController.create)

router.put("/:_id", auth("Admin"), categoryController.update)

router.delete("/:_id", auth("Admin"), categoryController.remove)

module.exports = router