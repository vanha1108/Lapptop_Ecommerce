import api from "./api"

const PROFILE_URL = `/profile`

export const get = () => api.get(PROFILE_URL)

export const update = (data) => api.put(PROFILE_URL, data)

export const changePassword = data => api.put(`${PROFILE_URL}/password`, data)
