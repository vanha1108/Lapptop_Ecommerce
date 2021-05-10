import api from "./api"

const CART_URL = "/cart"

export const get = () => api.get(CART_URL)

export const add = (data) => api.post(CART_URL, data)

export const remove = productId => api.delete(`${CART_URL}/${productId}`)

export const checkout = tokenId => api.post(`${CART_URL}/checkout`, { tokenId })
