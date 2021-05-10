import api from "./api"

const PRODUCT_URL = `/products`

export const get = (filters) => api.get(PRODUCT_URL, { params: filters })

export const getTop = () => api.get(PRODUCT_URL, { params: { isTop: true } })

export const view = _id => api.get(`${PRODUCT_URL}/view/${_id}`)
