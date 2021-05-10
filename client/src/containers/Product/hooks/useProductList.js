import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setLoading, setModal, setAlert } from "../../../redux/commons/action"
import { setProductList } from "../../../redux/products/action"
import { get, remove } from "../../../services/productServices"

import { DEFAULT_LIMIT } from "../../../utils/constants"

const useProductList = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.products.productList)
    const total = useSelector((state) => state.products.total)

    const [filters, setFilters] = useState({
        page: 1,
        limit: DEFAULT_LIMIT,
        search: "",
        category: null,
        sortBy: "name",
        isDescending: false
    })

    const changeFilters = useCallback(
        (objectValue) =>
            setFilters({
                ...filters,
                ...objectValue,
            }),
        [filters],
    )

    const onSort = field => {
        const isDescending = filters.sortBy === field ? !filters.isDescending : false
        changeFilters({
            sortBy: field,
            isDescending
        })
    }

    const getData = useCallback(async () => {
        dispatch(setLoading(true))

        try {
            const res = await get(filters)
            const { total, items } = res.data
            dispatch(setProductList({ productList: items, total }))
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
                        message: "Do you want to remove this product?",
                        onConfirm: async () => {
                            await remove(id)
                            dispatch(
                                setAlert({
                                    type: "success",
                                    message: "Remove product successfully",
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

    return {
        productList,
        total,
        filters,
        changeFilters,
        removeData,
        getData,
        onSort
    }
}

export default useProductList
