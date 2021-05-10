import { combineReducers } from "redux"

import commons from "./redux/commons/reducer"
import cart from "./redux/cart/reducer"

export default combineReducers({
    commons,
    cart
})
