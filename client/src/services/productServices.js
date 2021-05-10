import api from "./api"
import { BASE_URL } from "../utils/constants"

const PRODUCT_URL = `${BASE_URL}/products`

export const get = (filters) => api.get(PRODUCT_URL, { params: filters })

export const getById = (id) => api.get(`${PRODUCT_URL}/${id}`)

export const create = (data) => api.post(PRODUCT_URL, data)

export const update = (id, data) => api.put(`${PRODUCT_URL}/${id}`, data)

export const remove = (id) => api.delete(`${PRODUCT_URL}/${id}`)
