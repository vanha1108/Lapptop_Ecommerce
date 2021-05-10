import React from "react"
import CIcon from "@coreui/icons-react"

const navigations = [
    {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/",
        icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
        roles: ["Admin"]
    },
    {
        _tag: "CSidebarNavTitle",
        _children: ["System management"],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Users",
        to: "/users",
        icon: "cil-user",
        roles: ["Admin"],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Products",
        to: "/products",
        icon: "cil-laptop",
        roles: ["Admin"],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Categories",
        to: "/categories",
        icon: "cil-list",
        roles: ["Admin"],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Orders",
        to: "/orders",
        icon: "cil-bookmark",
        roles: ["Admin", "Seller"],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Guarantee orders",
        to: "/guaranteeorders",
        icon: "cil-bookmark",
        roles: ["Admin", "Technician"],
    },
    {
        _tag: "CSidebarNavTitle",
        _children: ["Customer communication"],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Chat",
        to: "/chat",
        icon: "cil-inbox",
        roles: ["Admin", "Seller", "Technician"],
    },
]

export default navigations
