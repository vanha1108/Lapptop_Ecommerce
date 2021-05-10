const express = require("express")

const { auth } = require("../middlewares")

const { customerGuaranteeOrderController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Guest"), customerGuaranteeOrderController.get)

router.get("/:_id", auth("Guest"), customerGuaranteeOrderController.getById)

router.post("/", auth("Guest"), customerGuaranteeOrderController.create)

router.put("/:_id", auth("Guest"), customerGuaranteeOrderController.update)

router.delete("/:_id", auth("Guest"), customerGuaranteeOrderController.remove)

module.exports = router