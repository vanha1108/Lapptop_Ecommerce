import { createReducer } from "@reduxjs/toolkit"

import { setOrderList } from "./action"

const initialState = {
    orderList: [],
    total: 0,
}

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(setOrderList, (state, action) => {
        state.orderList = action.payload.orderList
        state.total = action.payload.total
    })
})

export default reducer
