import { createReducer } from "@reduxjs/toolkit"

import { setUserList } from "./action"

const initialState = {
    userList: [],
    total: 0,
}

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(setUserList, (state, action) => {
        state.userList = action.payload.userList
        state.total = action.payload.total
    })
})

export default reducer
