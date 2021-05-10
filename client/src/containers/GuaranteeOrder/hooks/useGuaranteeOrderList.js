import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setLoading, setModal, setAlert } from "../../../redux/commons/action"
import { setGuaranteeOrderList } from "../../../redux/guaranteeOrders/action"
import { get, remove } from "../../../services/guaranteeOrderServices"

import { DEFAULT_LIMIT } from "../../../utils/constants"

const useGuaranteeOrderList = () => {
    const dispatch = useDispatch()
    const guaranteeOrderList = useSelector((state) => state.guaranteeOrders.guaranteeOrderList)
    const total = useSelector((state) => state.guaranteeOrders.total)

    const [filters, setFilters] = useState({
        page: 1,
        limit: DEFAULT_LIMIT,
        search: "",
        status: null,
        isPaid: null
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
            const res = await get(filters)
            const { total, items } = res.data
            dispatch(setGuaranteeOrderList({ guaranteeOrderList: items, total }))
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }

        dispatch(setLoading(false))
    }, [dispatch, filters])

    const removeData = useCallback(
        (id) => {
            dispatch(setLoading(true))

            try {
                dispatch(
                    setModal({
                        isOpen: true,
                        type: "warning",
                        message: "Do you want to remove this guarantee order?",
                        onConfirm: async () => {
                            await remove(id)
                            dispatch(
                                setAlert({
                                    type: "success",
                                    message: "Remove guarantee order successfully",
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
    }, [filters, getData])

    return { guaranteeOrderList, total, filters, changeFilters, removeData, getData }
}

export default useGuaranteeOrderList
