import api from "./api"

const GUARANTEE_ORDER_URL = "/customerguaranteeorders"

export const get = (filters) => api.get(GUARANTEE_ORDER_URL, { params: filters })

export const create = (data) => api.post(GUARANTEE_ORDER_URL, data)

export const update = (id, data) => api.put(`${GUARANTEE_ORDER_URL}/${id}`, data)

export const remove = id => api.delete(`${GUARANTEE_ORDER_URL}/${id}`)
