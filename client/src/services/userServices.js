import api from "./api"
import { BASE_URL } from "../utils/constants"

const USER_URL = `${BASE_URL}/users`

export const get = (filters) => api.get(USER_URL, { params: filters })

export const getById = (id) => api.get(`${USER_URL}/${id}`)

export const create = (data) => api.post(USER_URL, data)

export const update = (id, data) => api.put(`${USER_URL}/${id}`, data)

export const remove = (id) => api.delete(`${USER_URL}/${id}`)
