import { createReducer } from "@reduxjs/toolkit"

import { setSidebar, setLoading, setModal, setUser, setAlert, setNewMessage } from "./action"

const initialState = {
    sidebarShow: "responsive",
    isLoading: false,
    user: null,
    modal: { isOpen: false },
    alert: {
        type: "",
        message: "",
    },
    isNewMessage: false
}

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setSidebar, (state, action) => {
            state.sidebarShow = action.payload
        })
        .addCase(setLoading, (state, action) => {
            state.isLoading = action.payload
        })
        .addCase(setModal, (state, action) => {
            state.modal = action.payload
        })
        .addCase(setUser, (state, action) => {
            state.user = action.payload
        })
        .addCase(setAlert, (state, action) => {
            state.alert = action.payload
        })
        .addCase(setNewMessage, (state, action) => {
            state.isNewMessage = action.payload
        })
})

export default reducer
