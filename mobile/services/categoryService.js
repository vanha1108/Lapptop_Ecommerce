import api from "./api"

const CATEGORY_URL = `/categories`

export const get = () => api.get(CATEGORY_URL)
