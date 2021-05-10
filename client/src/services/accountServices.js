import api from "./api"

export const logIn = (data) => api.post("/account/login", data)

export const getUserInfo = () => api.get("/account/info")
