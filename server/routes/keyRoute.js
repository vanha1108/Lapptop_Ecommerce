const express = require("express")

const { auth } = require("../middlewares")

const { keyController } = require("../controllers")

const router = express.Router()

router.get("/firebase", auth("Admin"), keyController.getFirebaseKey)

module.exports = router
