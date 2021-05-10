import React from "react"
import { CommonActions } from "@react-navigation/native"

export const isReadyRef = React.createRef()

export const navigationRef = React.createRef()

const navigate = (name, params) => {
    if (isReadyRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params)
    } else {
        // You can decide what to do if the app hasn"t mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}

const back = () => {
    if (navigationRef.current) {
        navigationRef.current.dispatch(CommonActions.back())
    }
}

const reset = routeName => {
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }]
    })

    if (navigationRef.current) {
        navigationRef.current.dispatch(resetAction)
    }
}

export default {
    navigate,
    back,
    reset,
}