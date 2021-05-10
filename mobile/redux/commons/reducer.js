import { createReducer } from "@reduxjs/toolkit"
import { setIsCheckingAuthentication, setIsLogin, setLoading, setUser, addNotification, removeNotification } from "./action"

const initialState = {
  isLoading: false,
  isLogin: false,
  isCheckingAuthentication: true,
  user: null,
  notifications: []
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setIsLogin, (state, action) => {
      state.isLogin = action.payload
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload
    })
    .addCase(setIsCheckingAuthentication, (state, action) => {
      state.isCheckingAuthentication = action.payload
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload
    })
    .addCase(addNotification, (state, action) => {
      if (state.notifications.includes(action.payload)) return state
      state.notifications = [...state.notifications, action.payload]
    })
    .addCase(removeNotification, (state, action) => {
      return {
        ...state,
        notifications: state.notifications.filter(noti => noti !== action.payload)
      }
    })
})
