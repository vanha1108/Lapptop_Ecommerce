import api from "./api"
import { BASE_URL } from "../utils/constants"

const CATEGORY_URL = `${BASE_URL}/categories`

export const get = (filters) => api.get(CATEGORY_URL, { params: filters })

export const getById = (id) => api.get(`${CATEGORY_URL}/${id}`)

export const create = (data) => api.post(CATEGORY_URL, data)

export const update = (id, data) => api.put(`${CATEGORY_URL}/${id}`, data)

export const remove = (id) => api.delete(`${CATEGORY_URL}/${id}`)
