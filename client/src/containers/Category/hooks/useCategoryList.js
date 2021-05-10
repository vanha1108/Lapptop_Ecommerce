import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setLoading, setModal, setAlert } from "../../../redux/commons/action"
import { setCategoryList } from "../../../redux/categories/action"
import { get, remove } from "../../../services/categoryServices"

import { DEFAULT_LIMIT } from "../../../utils/constants"

const useCategoryList = () => {
    const dispatch = useDispatch()
    const categoryList = useSelector((state) => state.categories.categoryList)
    const total = useSelector((state) => state.categories.total)

    const [filters, setFilters] = useState({
        page: 1,
        limit: DEFAULT_LIMIT,
        search: "",
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
            dispatch(setCategoryList({ categoryList: items, total }))
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
                        message: "Do you want to remove this category?",
                        onConfirm: async () => {
                            await remove(id)
                            dispatch(
                                setAlert({
                                    type: "success",
                                    message: "Remove category successfully",
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

    return { categoryList, total, filters, changeFilters, removeData, getData }
}

export default useCategoryList
