import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"

import navigation from "../../../navigations/rootNavigation"
import screens from "../../../assets/constants/screens"
import { get, remove } from "../../../services/guaranteeOrderService"
import { setLoading } from "../../../redux/commons/action"

const useBuyingHistory = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [filters, setFilters] = useState({ search: "" })
    const nav = useNavigation()

    const changeFilters = valueObject => {
        setFilters({
            ...filters,
            ...valueObject
        })
    }

    const goToDetail = order => navigation.navigate(screens.GUARANTEE_ORDER_DETAIL, order ? { order } : {})

    const getData = useCallback(async () => {
        setIsLoading(true)

        try {
            const res = await get(filters)
            setOrders(res.data)
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        setIsLoading(false)
    }, [filters])

    useEffect(() => {
        getData(filters)
    }, [filters])

    useEffect(() => {
        const focusSubscription = nav.addListener("focus", () => getData(filters))
        return () => focusSubscription()
    }, [])

    const onRemove = id => Alert.alert("Warning", "Do you want to delete this guarantee order?", [
        {
            text: "Yes",
            onPress: async () => {
                dispatch(setLoading(true))
                try {
                    await remove(id)
                    getData(filters)
                } catch(err) {
                    Alert.alert(err.response?.data || err.message)
                }
                dispatch(setLoading(false))
            }
        }
    ])

    return {
        orders,
        getData,
        isLoading,
        filters,
        changeFilters,
        goToDetail,
        onRemove
    }
}

export default useBuyingHistory