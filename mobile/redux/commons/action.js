import { createAction } from "@reduxjs/toolkit"

export const setLoading = createAction("commons/setLoading")

export const setIsLogin = createAction("commons/setIsLogin")

export const setIsCheckingAuthentication = createAction(
  "commons/setIsCheckingAuthentication"
)

export const setUser = createAction("commons/setUser")

export const addNotification = createAction("commons/addNotification")
export const removeNotification = createAction("commons/removeNotification")
