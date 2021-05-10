import api from "./api"
import { BASE_URL } from "../utils/constants"

const ORDER_URL = `${BASE_URL}/orders`

export const get = (filters) => api.get(ORDER_URL, { params: filters })

export const getById = id => api.get(`${ORDER_URL}/${id}`)

export const update = (id, data) => api.put(`${ORDER_URL}/${id}`, data)

export const remove = (id) => api.delete(`${ORDER_URL}/${id}`)
