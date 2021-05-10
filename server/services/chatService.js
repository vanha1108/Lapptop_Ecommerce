const { User, Message, Conversation } = require("../models")

const Pusher = require("pusher")

const CHAT_CHANNEL_CUSTOMER = "CHAT_CHANNEL_CUSTOMER"
const CHAT_CHANNEL_SYSTEM = "CHAT_CHANNEL_SYSTEM"
const NOTIFICATION = "NOTIFICATION"
const NEW_NOTIFICATION = "NEW_NOTIFICATION"
const NEW_MESSAGE = "NEW_MESSAGE"
const RELOAD_CONVERSATION_LIST = "RELOAD_CONVERSATION_LIST"

const MESSAGE_LOADED_PER_TIME = 50
const CONVERSATION_LOADED_PER_TIME = 50

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
})

const createConversation = async (userId) => {
    const user = await User.findOne({ _id: userId }).populate("conversation")

    if (!!user.conversation) throw new Error("Invalid request")

    const newConversation = new Conversation({
        customer: user._id,
        messages: [],
    })

    await newConversation.save()

    const now = new Date().getTime()
    const newMessage = new Message({
        sender: user._id,
        conversation: newConversation._id,
        time: now,
        text: `${user.name} created this conversation`,
        isCustomerMessage: true,
    })

    await newMessage.save()

    user.conversation = newConversation._id
    newConversation.messages = [newMessage._id]
    newConversation.lastMessageTime = now

    await newConversation.save()
    await user.save()

    pusher.trigger(CHAT_CHANNEL_SYSTEM, RELOAD_CONVERSATION_LIST, {})
}

const getMessages = async ({ userId, conversationId, page }) => {
    const user = await User.findOne({ _id: userId })
    const isCustomer = user.roles.includes("Guest") && user.roles.length === 1

    if (isCustomer && user.conversation.toString() !== conversationId)
        throw new Error("Invalid request")

    const thisConversationId = isCustomer ? user.conversation : conversationId
 
    const total = await Message.countDocuments({ conversation: thisConversationId })
    const messages = await Message
        .find({ conversation: thisConversationId })
        .sort({ time: -1 })
        .limit(MESSAGE_LOADED_PER_TIME * page)
        .populate("sender", "name")

    return { items: messages.reverse(), total }
}

const getConversations = async (page) => {
    const total = await Conversation.countDocuments()

    const conversations = await Conversation.find({})
        .populate("messages")
        .populate("customer")
        .sort({ lastMessageTime: -1 })
        .skip(0)
        .limit(CONVERSATION_LOADED_PER_TIME * page)

    const items = conversations.map((conversation) => ({
        _id: conversation._id,
        customer: conversation.customer,
        lastMessageTime: conversation.lastMessageTime,
        unreadMessages: conversation.messages.filter(
            (message) =>
                !conversation.lastSeenBySystem ||
                message.time > conversation.lastSeenBySystem,
        ).length,
    }))

    const unreadConversations = conversations.filter(
        (conversation) =>
            !conversation.lastSeenBySystem ||
            conversation.lastMessageTime > conversation.lastSeenBySystem,
    ).length

    return { items: items, total, unreadConversations }
}

const customerGetConversation = async (userId) => {
    const user = await User.findOne({ _id: userId })
    const conversation = await Conversation.findOne({
        _id: user.conversation,
    }).populate("messages")

    if (!conversation) return null

    const result = {
        _id: conversation._id,
        customer: conversation.customer,
        lastMessageTime: conversation.lastMessageTime,
        unreadMessages: conversation.messages.filter(
            (message) =>
                !conversation.lastSeenByCustomer ||
                message.time > conversation.lastSeenByCustomer,
        ).length,
    }

    return result
}

const createMessage = async ({ userId, text, conversationId }) => {
    if (!text || !text.trim()) return
    const user = await User.findOne({ _id: userId })
    const isCustomerMessage =
        user.roles.includes("Guest") && user.roles.length == 1

    if (isCustomerMessage && !user.conversation)
        throw new Error("Invalid request")

    const thisConversationId = isCustomerMessage
        ? user.conversation
        : conversationId

    const now = new Date().getTime()
    const conversation = await Conversation.findOne({ _id: thisConversationId })
    const newMessage = new Message({
        sender: userId,
        conversation: thisConversationId,
        text,
        time: now,
        isCustomerMessage,
    })

    // handle pusher
    const channel = isCustomerMessage
        ? CHAT_CHANNEL_SYSTEM
        : CHAT_CHANNEL_CUSTOMER

    pusher.trigger(`${channel}-${conversationId}`, NEW_MESSAGE, {
        message: newMessage,
    })

    if (!isCustomerMessage) {
        pusher.trigger(`SYSTEM-${conversationId}`, NEW_MESSAGE, {
            message: {
                sender: {
                    _id: userId,
                    name: user.name
                },
                conversation: thisConversationId,
                text,
                time: now,
                isCustomerMessage
            }
        })

        pusher.trigger(`${NOTIFICATION}-${conversation.customer}`, NEW_NOTIFICATION, "CHAT")
    }

    await newMessage.save()

    conversation.messages = [...conversation.messages, newMessage._id]
    conversation.lastMessageTime = now

    if (!isCustomerMessage) {
        conversation.lastSeenBySystem = now
    } else {
        conversation.lastSeenByCustomer = now
        await pusher.trigger(CHAT_CHANNEL_SYSTEM, RELOAD_CONVERSATION_LIST, thisConversationId)
    }

    await conversation.save()

    return newMessage
}

const updateLastSeenBySystemTime = async (conversationId) => {
    const conversation = await Conversation.findOne({ _id: conversationId })
    if (!conversation) throw new Error("Invalid request")
    const messages = await Message.find({
        conversation: conversation._id,
    }).sort({ time: -1 })

    if (!!messages[0]) {
        conversation.lastSeenBySystem = messages[0].time
        await conversation.save()
    }

    pusher.trigger(CHAT_CHANNEL_SYSTEM, RELOAD_CONVERSATION_LIST, {})
}

module.exports = {
    createConversation,
    createMessage,
    getMessages,
    getConversations,
    customerGetConversation,
    updateLastSeenBySystemTime,
}
