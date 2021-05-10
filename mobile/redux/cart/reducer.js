import { createReducer } from "@reduxjs/toolkit"
import { setCart } from "./action"

const initialState = {
  cart: []
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setCart, (state, action) => {
      state.cart = action.payload
    })
})
