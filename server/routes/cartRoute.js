const express = require("express")

const { auth } = require("../middlewares")

const { cartController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Guest"), cartController.get)

router.post("/", auth("Guest"), cartController.add)

router.delete("/:productId", auth("Guest"), cartController.remove)

router.post("/checkout", auth("Guest"), cartController.checkout)

module.exports = router