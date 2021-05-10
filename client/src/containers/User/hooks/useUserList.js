import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setLoading, setModal, setAlert } from "../../../redux/commons/action"
import { setUserList } from "../../../redux/users/action"
import { get, remove } from "../../../services/userServices"

import { DEFAULT_LIMIT } from "../../../utils/constants"

const useUserList = () => {
    const dispatch = useDispatch()
    const userList = useSelector((state) => state.users.userList)
    const total = useSelector((state) => state.users.total)

    const [filters, setFilters] = useState({
        page: 1,
        limit: DEFAULT_LIMIT,
        search: "",
        roles: null
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
            dispatch(setUserList({ userList: items, total }))
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
                        message: "Do you want to remove this user?",
                        onConfirm: async () => {
                            await remove(id)
                            dispatch(
                                setAlert({
                                    type: "danger",
                                    message: "Remove user successfully",
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

    return { userList, total, filters, changeFilters, removeData, getData }
}

export default useUserList
