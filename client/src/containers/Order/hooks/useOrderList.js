import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import startOfMonth from "date-fns/startOfMonth"

import { setLoading, setModal, setAlert } from "../../../redux/commons/action"
import { setOrderList } from "../../../redux/orders/action"
import { get, remove, update } from "../../../services/orderServices"

import { DEFAULT_LIMIT } from "../../../utils/constants"

const yearNow = new Date().getFullYear()
const monthNow = new Date().getMonth() + 1

const useOrderList = () => {
    const dispatch = useDispatch()
    const orderList = useSelector((state) => state.orders.orderList)
    const total = useSelector((state) => state.orders.total)

    const [year, setYear] = useState(yearNow)
    const [month, setMonth] = useState(monthNow)

    const [filters, setFilters] = useState({
        page: 1,
        limit: DEFAULT_LIMIT,
        isDone: null,
        isPaid: null,
        search: ""
    })

    const changeFilters = useCallback(
        (objectValue) =>
            setFilters({
                ...filters,
                ...objectValue,
            }),
        [filters],
    )

    const getData = useCallback(async () => {
        dispatch(setLoading(true))

        try {
            const res = await get({
                ...filters,
                start: startOfMonth(new Date(year, month - 1, 1, 0, 0, 0)).getTime(),
                end: startOfMonth(new Date(year, month, 1, 0, 0, 0)).getTime(),
            })
            const { total, items } = res.data
            dispatch(setOrderList({ orderList: items, total }))
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }

        dispatch(setLoading(false))
    }, [dispatch, filters, year, month])

    const removeData = useCallback(
        (id) => {
            dispatch(setLoading(true))

            try {
                dispatch(
                    setModal({
                        isOpen: true,
                        type: "warning",
                        message: "Do you want to remove this order?",
                        onConfirm: async () => {
                            await remove(id)
                            dispatch(
                                setAlert({
                                    type: "success",
                                    message: "Remove order successfully",
                                }),
                            )
                            getData()
                        },
                    }),
                )
            } catch (err) {
                dispatch(
                    setAlert({
                        type: "danger",
                        message: err.response?.data || err.message,
                    }),
                )
            }

            dispatch(setLoading(false))
        },
        [dispatch, getData],
    )

    const updateData = useCallback(
        (id, status) => {
            dispatch(setLoading(true))

            const message = `Do you want to mark this order to be ${
                status === "done" ? "waiting" : "done"
            }?`

            try {
                dispatch(
                    setModal({
                        isOpen: true,
                        type: "warning",
                        message,
                        onConfirm: async () => {
                            await update(id, {
                                status: status === "done" ? "waiting" : "done",
                            })
                            dispatch(
                                setAlert({
                                    type: "success",
                                    message: "Update order successfully",
                                }),
                            )
                            getData()
                        },
                    }),
                )
            } catch (err) {
                dispatch(
                    setAlert({
                        type: "danger",
                        message: err.response?.data || err.message,
                    }),
                )
            }

            dispatch(setLoading(false))
        },
        [dispatch, getData],
    )

    useEffect(() => {
        getData()
    }, [filters, getData, year, month])

    return {
        orderList,
        total,
        filters,
        year,
        month,
        setYear,
        setMonth,
        changeFilters,
        removeData,
        getData,
        updateData,
    }
}

export default useOrderList
