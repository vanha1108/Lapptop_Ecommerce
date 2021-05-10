import api from "./api"

const CHAT_URL = `/chat`

export const createConversation = () => api.post(`${CHAT_URL}/conversations`)
export const getConversation = () => api.get(`${CHAT_URL}/conversation`)

export const getMessages = ({ page, conversationId }) =>
    api.get(`${CHAT_URL}/messages`, { params: { page, conversationId } })

export const createMessage = ({ text, conversationId }) =>
    api.post(`${CHAT_URL}/messages`, { text, conversationId })
