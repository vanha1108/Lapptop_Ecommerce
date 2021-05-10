import { useCallback, useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { setLoading, setAlert } from "../../../redux/commons/action"
import { get } from "../../../services/dashboardServices"

const endTime = new Date().getTime()
const startTime = endTime - 30 * 24 * 60 * 60 * 1000

const useDashboard = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({})

    const getData = useCallback(async () => {
        dispatch(setLoading(true))

        try {
            const res = await get({ startTime, endTime })
            setData(res.data)
        } catch(err) {
            dispatch(setAlert({
                type: "danger",
                message: err.response?.data || err.message
            }))
        }

        dispatch(setLoading(false))
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return { data }
}

export default useDashboard