import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Pusher from "pusher-js/with-encryption"

import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from "../../../utils/constants"
import { setAlert, setNewMessage } from "../../../redux/commons/action"

import {
    getMessages,
    createMessage,
    updateLastSeenBySystemTime,
} from "../../../services/chatService"

import { setLoading } from "../../../redux/commons/action"

const CHAT_CHANNEL_SYSTEM = "CHAT_CHANNEL_SYSTEM"
const SYSTEM = "SYSTEM"
const NEW_MESSAGE = "NEW_MESSAGE"

const useChat = (conversation) => {
    const user = useSelector((state) => state.commons.user)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [canLoadMore, setCanLoadMore] = useState(false)
    const [messages, setMessages] = useState([])
    const [upcomingMessage, setUpcomingMessage] = useState(null)
    const [text, setText] = useState("")

    const getData = useCallback(async () => {
        setText("")
        if (!conversation) {
            setMessages([])
            setPage(1)
            return
        }

        await updateLastSeenBySystemTime(conversation._id)

        dispatch(setLoading(true))

        try {
            const res = await getMessages({
                page,
                conversationId: conversation._id,
            })
            const { items, total } = res.data
            setMessages(items)
            setCanLoadMore(items.length < total)
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }

        dispatch(setLoading(false))
    }, [conversation, page, dispatch])

    useEffect(() => {
        getData()
        const pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_APP_CLUSTER,
        })
        let channel
        let channelSystem
        if (conversation) {
            channel = pusher.subscribe(
                `${CHAT_CHANNEL_SYSTEM}-${conversation._id}`,
            )

            channel.bind(NEW_MESSAGE, (data) => {
                updateLastSeenBySystemTime(conversation._id)
                setUpcomingMessage(data.message)
            })

            channelSystem = pusher.subscribe(`${SYSTEM}-${conversation._id}`)
            channelSystem.bind(NEW_MESSAGE, (data) => {
                if (data.messsage?.sender?._id === user._id) return
                updateLastSeenBySystemTime(conversation._id)
                setUpcomingMessage(data.message)
            })
        }

        return () => {
            channel && channel.unsubscribe(`${CHAT_CHANNEL_SYSTEM}-${conversation._id}`)
            channelSystem && channelSystem.unsubscribe(`${SYSTEM}-${conversation._id}`)
        }
    }, [page, getData, conversation])

    useEffect(() => {
        dispatch(setNewMessage(false))
    }, [])

    useEffect(() => {
        scrollNewMessage()
    }, [messages])

    useEffect(() => {
        if (!!upcomingMessage) {
            if (upcomingMessage.conversation === conversation._id) {
                setMessages([...messages, upcomingMessage])
            }
            setUpcomingMessage(null)
        }
    }, [upcomingMessage])

    const scrollNewMessage = () => {
        const messageListBottom = document.getElementById("message-list-bottom")
        messageListBottom.scrollIntoView()
    }

    const sendMessage = useCallback(async () => {
        if (!conversation) return
        if (!text || !text.trim()) return
        try {
            setMessages([
                ...messages,
                {
                    sender: {
                        _id: user._id,
                        name: user.name
                    },
                    text: text.trim(),
                    isCustomerMessage: false,
                    conversation: conversation?._id,
                    time: new Date().getTime,
                },
            ])
            setText("")
            await createMessage({
                text,
                conversationId: conversation._id,
            })
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }
    }, [text, conversation, messages])

    const loadMore = useCallback(() => {
        setPage(page + 1)
    }, [page])

    return {
        messages,
        canLoadMore,
        loadMore,
        sendMessage,
        text,
        setText,
    }
}

export default useChat
