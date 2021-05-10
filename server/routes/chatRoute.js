const express = require("express")

const { auth } = require("../middlewares")

const { chatController } = require("../controllers")

const router = express.Router()

router.post("/conversations", auth("Guest"), chatController.createConversation)

router.get(
    "/conversations",
    auth("Admin, Seller, Technician"),
    chatController.getConversations,
)

router.get(
    "/conversation",
    auth("Guest"),
    chatController.customerGetConversation,
)

router.put(
    "/conversations/:conversationId/lastseenbysystem", 
    auth("Admin, Seller, Technician"), 
    chatController.updateLastSeenBySystemTime
)

router.post(
    "/messages",
    auth("Admin, Seller, Guest, Technician"),
    chatController.createMessage,
)

router.get(
    "/messages",
    auth("Admin, Seller, Guest, Technician"),
    chatController.getMessages,
)

module.exports = router
