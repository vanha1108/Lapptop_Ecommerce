import CategoryList from "../containers/Category/views/CategoryList"
import UserList from "../containers/User/views/UserList"
import ProductList from "../containers/Product/views/ProductList"
import OrderList from "../containers/Order/views/OrderList"
import ChatContainer from "../containers/Chat/views/ChatContainer"
import Dashboard from "../containers/Dashboard/views/Dashboard"
import GuaranteeOrderList from "../containers/GuaranteeOrder/views/GuaranteeOrderList"

const routes = [
    {
        path: "/",
        exact: true,
        name: "Dashboard",
        component: Dashboard,
        roles: ["Admin"],
    },
    {
        path: "/categories",
        exact: true,
        name: "Category List",
        component: CategoryList,
        roles: ["Admin"],
    },
    {
        path: "/users",
        exact: true,
        name: "User List",
        component: UserList,
        roles: ["Admin"],
    },
    {
        path: "/users/:userId",
        exact: true,
        name: "User List",
        component: UserList,
        roles: ["Admin"],
    },
    {
        path: "/products",
        exact: true,
        name: "Product List",
        component: ProductList,
        roles: ["Admin"],
    },
    {
        path: "/orders",
        exact: true,
        name: "Order List",
        component: OrderList,
        roles: ["Admin", "Seller"],
    },
    {
        path: "/chat",
        exact: true,
        name: "Chat Container",
        component: ChatContainer,
        roles: ["Admin", "Seller", "Technician"],
    },
    {
        path: "/guaranteeorders",
        exact: true,
        name: "Guarantee Order List",
        component: GuaranteeOrderList,
        roles: ["Admin", "Technician"],
    }
]

export default routes
