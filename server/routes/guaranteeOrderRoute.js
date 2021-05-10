const express = require("express")

const { auth } = require("../middlewares")

const { guaranteeOrderController } = require("../controllers")

const router = express.Router()

router.get("/", auth("Admin, Technician"), guaranteeOrderController.get)

router.get("/:_id", auth("Admin, Technician"), guaranteeOrderController.getById)

router.get("/order/info", auth("Admin, Technician"), guaranteeOrderController.getInfo)

router.post("/", auth("Admin, Technician"), guaranteeOrderController.create)

router.put("/:_id", auth("Admin, Technician"), guaranteeOrderController.update)

router.delete("/:_id", auth("Admin, Technician"), guaranteeOrderController.remove)

module.exports = router