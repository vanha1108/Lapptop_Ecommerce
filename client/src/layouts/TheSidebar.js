import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from "@coreui/react"

import CIcon from "@coreui/icons-react"

import { setSidebar } from "../redux/commons/action"

const TheSidebar = ({ navigations }) => {
    const dispatch = useDispatch()
    const show = useSelector((state) => state.commons.sidebarShow)

    return (
        <CSidebar show={show} onShowChange={(val) => dispatch(setSidebar(val))}>
            <CSidebarBrand className="d-md-down-none" to="/">
                <CIcon
                    className="c-sidebar-brand-full"
                    name="logo-negative"
                    height={35}
                />
                <CIcon
                    className="c-sidebar-brand-minimized"
                    name="sygnet"
                    height={35}
                />
            </CSidebarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={navigations}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle,
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
