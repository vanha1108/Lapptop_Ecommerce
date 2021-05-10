import { useState, useEffect, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Keyboard } from "react-native"
import Pusher from "pusher-js/react-native"
import { useNavigation } from "@react-navigation/native"

import { setLoading, removeNotification } from "../../../redux/commons/action"
import {
    createConversation,
    getConversation,
    getMessages,
    createMessage,
} from "../../../services/chatServices"

import pusherConfig from "../configs/pusherConfig.json"

const CHAT_CHANNEL_CUSTOMER = "CHAT_CHANNEL_CUSTOMER"
const NEW_MESSAGE = "NEW_MESSAGE"

const useChat = () => {
    const messageListRef = useRef()
    const navigation = useNavigation()
    const user = useSelector((state) => state.commons.user)
    const [isLoading, setIsLoading] = useState(false)
    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1)
    const [canLoadMore, setCanLoadMore] = useState(false)
    const [text, setText] = useState("")
    const [upcomingMessage, setUpcomingMessage] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0)

    const dispatch = useDispatch()
    const getData = useCallback(async () => {
        dispatch(setLoading(true))

        try {
            let res = await getConversation()
            if (!res.data) {
                await createConversation()
                res = await getConversation()
            }
            setConversation(res.data)
        } catch (err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }, [])

    useEffect(() => {
        const focusSubscription = navigation.addListener("focus", () => dispatch(removeNotification("CHAT")))
        return () => focusSubscription()
    }, [])

    const sendMessage = useCallback(async () => {
        if (!conversation) return
        if (!text || !text.trim()) return
        try {
            setUpcomingMessage({
                sender: user._id,
                text: text.trim(),
                isCustomerMessage: true,
                conversation: conversation._id,
                time: new Date().getTime(),
            })
            setText("")
            await createMessage({
                text,
                conversationId: conversation._id,
            })
        } catch (err) {
            Alert.alert(err.response?.data || err.message)
        }
    }, [text, conversation])

    const loadMore = useCallback(() => {
        setPage(page + 1)
    }, [page])

    const userGetMessages = useCallback(async (conversation, page) => {
        if (!!conversation && !!conversation._id) {
            setIsLoading(true)
            try {
                const res = await getMessages({
                    page,
                    conversationId: conversation._id,
                })
                const { items, total } = res.data
                setMessages(items)
                setCanLoadMore(items.length < total)
            } catch (err) {
                Alert.alert(err.response?.data || err.message)
            }
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getData()
        let interval = null
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", e => {
            setKeyboardHeight(e.endCoordinates.height)
            interval = setInterval(() => {
                if (messageListRef && messageListRef.current) {
                    setTimeout(() => {
                        messageListRef.current.scrollToEnd({ animated: true })
                    }, isLoaded ? 100 : 500)
                    clearInterval(interval)
                    if (!isLoaded) {
                        setIsLoaded(true)
                    }
                }
            }, 200)
        })
        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardHeight(0))
        return () => {
            keyboardShowListener.remove()
            keyboardHideListener.remove()
            interval && clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        let channel
        const pusher = new Pusher(pusherConfig.key, pusherConfig)
        if (!!conversation && !!conversation._id) {
            userGetMessages(conversation, page)
            channel = pusher.subscribe(
                `${CHAT_CHANNEL_CUSTOMER}-${conversation._id}`,
            )

            channel.bind(NEW_MESSAGE, (data) => {
                setUpcomingMessage(data.message)
            })
        }

        return () =>
            channel &&
            channel.unsubscribe(`${CHAT_CHANNEL_CUSTOMER}-${conversation._id}`)
    }, [conversation, userGetMessages, page])

    useEffect(() => {
        if (!!upcomingMessage && !messages.find(message => message.time === upcomingMessage.time)) {
            setMessages([...messages, upcomingMessage])
            setUpcomingMessage(null)
        }
    }, [upcomingMessage])

    useEffect(() => {
        if (!!messages.length) {
            const interval = setInterval(() => {
                if (messageListRef && messageListRef.current) {
                    setTimeout(() => {
                        messageListRef.current.scrollToEnd({ animated: true })
                        clearInterval(interval)
                        if (!isLoaded) {
                            setIsLoaded(true)
                        }
                    }, isLoaded ? 100 : 1000)
                }
            }, 200)
        }
    }, [messages.length])

    return {
        messages,
        canLoadMore,
        loadMore,
        sendMessage,
        userGetMessages,
        isLoading,
        conversation, 
        page,
        text,
        setText,
        messageListRef,
        keyboardHeight
    }
}

export default useChat
