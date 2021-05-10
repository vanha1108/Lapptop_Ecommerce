const { chatService } = require("../services")

const createConversation = async (req, res) => {
    try {
        const { userId } = req
        await chatService.createConversation(userId)
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

const createMessage = async (req, res) => {
    try {
        const { userId } = req
        const { text, conversationId } = req.body
        const data = await chatService.createMessage({
            userId,
            text,
            conversationId,
        })
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

const getMessages = async (req, res) => {
    try {
        const { userId } = req
        const { page, conversationId } = req.query
        const data = await chatService.getMessages({
            userId,
            conversationId,
            page,
        })
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

const getConversations = async (req, res) => {
    try {
        const { page } = req.query
        const data = await chatService.getConversations(page)
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

const customerGetConversation = async (req, res) => {
    try {
        const { userId } = req
        const data = await chatService.customerGetConversation(userId)
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

const updateLastSeenBySystemTime = async (req, res) => {
    try {
        const { conversationId } = req.params
        await chatService.updateLastSeenBySystemTime(conversationId)
        res.sendStatus(200)
    } catch(err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

module.exports = {
    createConversation,
    createMessage,
    getMessages,
    getConversations,
    customerGetConversation,
    updateLastSeenBySystemTime
}
