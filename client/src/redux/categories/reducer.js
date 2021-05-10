import { createReducer } from "@reduxjs/toolkit"

import { setCategoryList } from "./action"

const initialState = {
    categoryList: [],
    total: 0,
}

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(setCategoryList, (state, action) => {
        state.categoryList = action.payload.categoryList
        state.total = action.payload.total
    })
})

export default reducer
