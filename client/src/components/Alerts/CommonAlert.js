import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Alert } from "reactstrap"

import { setAlert } from "../../redux/commons/action"

const CommonAlert = () => {
    const dispatch = useDispatch()
    const alert = useSelector((state) => state.commons.alert)
    const timeout = useRef()

    const onDismiss = () => {
        dispatch(setAlert({ message: "" }))
        timeout && timeout.current && clearTimeout(timeout.current)
    }

    useEffect(() => {
        if (!!alert.message?.length) {
            timeout && timeout.current && clearTimeout(timeout.current)
            timeout.current = setTimeout(() => {
                dispatch(setAlert({ message: "" }))
            }, 3000)
        }
    }, [alert, dispatch])

    return alert.message?.length > 0 ? (
        <div className="app-alert">
            <Alert
                color={alert.type}
                isOpen={alert.message.length > 0}
                toggle={onDismiss}
            >
                {alert.message}
            </Alert>
        </div>
    ) : null
}

export default CommonAlert
