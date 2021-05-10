import api from "./api"
import { BASE_URL } from "../utils/constants"

const CHAT_URL = `${BASE_URL}/chat`

export const getConversations = (page) =>
    api.get(`${CHAT_URL}/conversations`, { params: { page } })

export const getMessages = ({ page, conversationId }) =>
    api.get(`${CHAT_URL}/messages`, { params: { page, conversationId } })

export const createMessage = ({ text, conversationId }) =>
    api.post(`${CHAT_URL}/messages`, { text, conversationId })

export const updateLastSeenBySystemTime = conversationId => 
    api.put(`${CHAT_URL}/conversations/${conversationId}/lastseenbysystem`)
