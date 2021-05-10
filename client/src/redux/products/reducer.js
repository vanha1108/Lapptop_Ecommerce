import { createReducer } from "@reduxjs/toolkit"

import { setProductList } from "./action"

const initialState = {
    productList: [],
    total: 0,
}

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(setProductList, (state, action) => {
        state.productList = action.payload.productList
        state.total = action.payload.total
    })
})

export default reducer
