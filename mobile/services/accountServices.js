import api from "./api"

const ACCOUNT_URL = "/account"

export const logIn = (data) => api.post(`${ACCOUNT_URL}/loginmobile`, data)

export const getUserInfo = () => api.get(`${ACCOUNT_URL}/info`)

export const signUp = data => api.post(`${ACCOUNT_URL}/signup`, data)

export const confirmSignUp = data => api.post(`${ACCOUNT_URL}/confirmsignup`, data)

export const forgotPassword = data => api.post(`${ACCOUNT_URL}/forgotpassword`, data)

export const confirmForgotPassword = data => api.post(`${ACCOUNT_URL}/confirmforgotpassword`, data)