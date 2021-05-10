import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { CHeader, CToggler, CHeaderBrand, CHeaderNav } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { AiOutlineMessage } from "react-icons/ai"
import Pusher from "pusher-js/with-encryption"

import TheHeaderDropdown from "./TheHeaderDropdown"

import { setSidebar, setNewMessage } from "../redux/commons/action"
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from "../utils/constants"

const CHAT_CHANNEL_SYSTEM = "CHAT_CHANNEL_SYSTEM"
const RELOAD_CONVERSATION_LIST = "RELOAD_CONVERSATION_LIST"

const TheHeader = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const sidebarShow = useSelector((state) => state.commons.sidebarShow)
    const isNewMessage = useSelector(state => state.commons.isNewMessage)

    const toggleSidebar = () => {
        const val = [true, "responsive"].includes(sidebarShow)
            ? false
            : "responsive"
        dispatch(setSidebar(val))
    }

    const toggleSidebarMobile = () => {
        const val = [false, "responsive"].includes(sidebarShow)
            ? true
            : "responsive"
        dispatch(setSidebar(val))
    }

    const isChat = location.pathname === "/chat"

    useEffect(() => {
        const pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_APP_CLUSTER,
        })
        const channel = pusher.subscribe(CHAT_CHANNEL_SYSTEM)

        channel.bind(RELOAD_CONVERSATION_LIST, () => {
            if (isChat) return
            dispatch(setNewMessage(true))
        })

        return () => channel.unsubscribe(CHAT_CHANNEL_SYSTEM)
    }, [])

    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
                <CIcon name="logo" height="48" alt="Logo" />
            </CHeaderBrand>

            <CHeaderNav className="ml-auto px-3">
                <div className="position-relative cursor-pointer hover-opacity" onClick={() => history.push("/chat")}>
                    <AiOutlineMessage 
                        size={20}
                    />
                    {isNewMessage && <div className="new-message-dot" />}
                </div>
                <TheHeaderDropdown />
            </CHeaderNav>
        </CHeader>
    )
}

export default TheHeader
