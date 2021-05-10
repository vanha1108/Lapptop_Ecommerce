import api from "./api"

const USER_URL = `/users`
const ORDER_URL = `/orders`

export const getBuyingHistory = () => api.get(`${USER_URL}/customerservice/buyinghistory`)
export const getNotifications = () => api.get(`${USER_URL}/customerservice/notifications`)
export const getOrder = id => api.get(`${ORDER_URL}/${id}`)
