import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import Pusher from "pusher-js/with-encryption"

import { getConversations } from "../../../services/chatService"
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from "../../../utils/constants"
import { setAlert } from "../../../redux/commons/action"

const CHAT_CHANNEL_SYSTEM = "CHAT_CHANNEL_SYSTEM"
const RELOAD_CONVERSATION_LIST = "RELOAD_CONVERSATION_LIST"

const useConversationList = () => {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [conversations, setConversationList] = useState([])
    const [canLoadMore, setCanLoadMore] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [activeConversation, setActiveConversation] = useState(null)
    const [unreadConversations, setUnreadConversations] = useState(0)

    const toggle = useCallback(() => {
        setOpen(!isOpen)
    }, [isOpen])

    const getData = useCallback(async () => {
        setLoading(true)

        try {
            const res = await getConversations(page)
            const { items, total, unreadConversations } = res.data
            setConversationList(items)
            setUnreadConversations(unreadConversations)
            setCanLoadMore(items.length < total)
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }

        setLoading(false)
    }, [page])

    useEffect(() => {
        getData()
        const pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_APP_CLUSTER,
        })
        const channel = pusher.subscribe(CHAT_CHANNEL_SYSTEM)

        channel.bind(RELOAD_CONVERSATION_LIST, thisConversationId => {
            if (activeConversation?._id === thisConversationId) return 
            getData()
        })

        return () => channel.unsubscribe(CHAT_CHANNEL_SYSTEM)
    }, [page, getData])

    useEffect(() => {
        if (!!conversations && !!conversations[0] && !activeConversation) {
            setActiveConversation(conversations[0])
        }
    }, [conversations])

    const loadMore = useCallback(() => {
        setPage(page + 1)
    }, [page])

    const toggleConversation = useCallback(
        (conversation) => {
            setActiveConversation(conversation)
            toggle()
        },
        [setActiveConversation, toggle],
    )

    return {
        conversations,
        unreadConversations,
        canLoadMore,
        loadMore,
        isLoading,
        isOpen,
        toggle,
        activeConversation,
        toggleConversation,
    }
}

export default useConversationList
