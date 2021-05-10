import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Alert } from "react-native"

import { setLoading } from "../../../redux/commons/action"
import { getOrder } from "../../../services/userService"

const useGuarantee = () => {
    const dispatch = useDispatch()
    const [order, setOrder] = useState(null)
    const [searchString, setSearchString] = useState("")

    const onSearch = async () => {
        if (!searchString || !searchString.trim()) {
            setOrder(null)
            return
        }
        dispatch(setLoading(true))

        try {
            const res = await getOrder(searchString)
            setOrder(res.data)
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }

    useEffect(() => {
        onSearch()
    }, [searchString])

    return { order, searchString, setSearchString }
}

export default useGuarantee