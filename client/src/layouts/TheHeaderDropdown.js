import React, { useCallback } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CImg,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"

import { ACCESS_TOKEN } from "../utils/constants"

const TheHeaderDropdown = () => {
    const history = useHistory()
    const user = useSelector(state => state.commons.user)

    const logOut = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN)
        history.push("/login")
    }, [history])

    const goToUserDetail = useCallback(() => {
        history.push({
            pathname: "/users",
            state: { _id: user._id, email: user.email }
        })
    }, [user, history])

    return (
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        src={"avatars/avatar.png"}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                    />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>
                    <CIcon name="cil-user" className="mfe-2" />
                    {user.name}
                </CDropdownItem>
                <CDropdownItem onClick={goToUserDetail}>
                    <CIcon name="cil-envelope-closed" className="mfe-2" />
                    {user.email}
                </CDropdownItem>
                <CDropdownItem onClick={logOut}>
                    <CIcon name="cil-ban" className="mfe-2" />
                    Sign out
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderDropdown
