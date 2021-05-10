const { Notification } = require("../models")
const Pusher = require("pusher")

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
})

const NOTIFICATION = "NOTIFICATION"
const NEW_NOTIFICATION = "NEW_NOTIFICATION"

const get = async (userId) => {
    const items = await Notification
        .find({ user: userId })
        .sort({ createdAt: -1 })
    return items
}

const create = async ({ userId, text }) => {
    const newNotification = new Notification({
        user: userId,
        text,
        createdAt: new Date().getTime()
    })

    await newNotification.save()

    await pusher.trigger(`${NOTIFICATION}-${userId}`, NEW_NOTIFICATION, "NOTIFICATION")
}

module.exports = {
    get,
    create
}