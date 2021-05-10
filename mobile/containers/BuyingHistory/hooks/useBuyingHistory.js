import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"

import { getBuyingHistory } from "../../../services/userService"
import { removeNotification } from "../../../redux/commons/action"

const useBuyingHistory = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])

    const getData = useCallback(async () => {
        setIsLoading(true)

        try {
            const res = await getBuyingHistory()
            setOrders(res.data)
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        setIsLoading(false)
    }, [])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const focusSubscription = navigation.addListener("focus", () => dispatch(removeNotification("BUYING_HISTORY")))
        return () => focusSubscription()
    }, [])

    return {
        orders,
        getData,
        isLoading
    }
}

export default useBuyingHistory