import api from "./api"
import { BASE_URL } from "../utils/constants"

const GUARANTEE_ORDER_URL = `${BASE_URL}/guaranteeorders`

export const get = (filters) => api.get(GUARANTEE_ORDER_URL, { params: filters })

export const getById = (id) => api.get(`${GUARANTEE_ORDER_URL}/${id}`)

export const getOrderInfo = params => api.get(`${GUARANTEE_ORDER_URL}/order/info`, { params })

export const create = (data) => api.post(GUARANTEE_ORDER_URL, data)

export const update = (id, data) => api.put(`${GUARANTEE_ORDER_URL}/${id}`, data)

export const remove = (id) => api.delete(`${GUARANTEE_ORDER_URL}/${id}`)
