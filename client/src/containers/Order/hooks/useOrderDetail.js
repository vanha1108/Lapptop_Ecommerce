import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { setLoading, setAlert } from "../../../redux/commons/action"
import { getById } from "../../../services/orderServices"

const useOrderDetail = () => {
    const dispatch = useDispatch()
    const [id, setId] = useState(0)
    const [orderDetail, setOrderDetail] = useState({})

    const getData = useCallback(async () => {
        dispatch(setLoading(true))
        try {
            const res = await getById(id)
            setOrderDetail(res.data)
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }
        dispatch(setLoading(false))
    }, [id, dispatch, setOrderDetail])

    useEffect(() => {
        !!id ? getData() : setOrderDetail({})
    }, [id, getData])

    return { id, setId, orderDetail }
}

export default useOrderDetail
