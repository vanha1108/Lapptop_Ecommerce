import { createReducer } from "@reduxjs/toolkit"

import { setGuaranteeOrderList } from "./action"

const initialState = {
    guaranteeOrderList: [],
    total: 0,
}

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(setGuaranteeOrderList, (state, action) => {
        state.guaranteeOrderList = action.payload.guaranteeOrderList
        state.total = action.payload.total
    })
})

export default reducer
