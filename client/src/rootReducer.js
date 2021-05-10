import { combineReducers } from "redux"

import commons from "./redux/commons/reducer"
import categories from "./redux/categories/reducer"
import users from "./redux/users/reducer"
import products from "./redux/products/reducer"
import orders from "./redux/orders/reducer"
import guaranteeOrders from "./redux/guaranteeOrders/reducer"

export default combineReducers({
    commons,
    categories,
    users,
    products,
    orders,
    guaranteeOrders
})
