import React, { useState, useEffect, useCallback } from "react"
import Select from "react-select"
import { setLoading } from "../../../redux/commons/action"
import { useDispatch } from "react-redux"
import { get } from "../../../services/categoryServices"

const ProductCategorySelector = (props) => {
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()

    const getData = useCallback(async () => {
        dispatch(setLoading(true))
        try {
            const res = await get()
            setCategories(res.data.items.map(item => ({ value: item._id, label: item.name })))
        } catch (err) {
            console.error(err.response?.data || err.message)
        }
        dispatch(setLoading(false))
    }, [dispatch])

    useEffect(() => {
        getData()
    }, [getData])

    const { id } = props

    const initValue = !!id
        ? categories.find((option) => option.value === id) || null
        : null

    return <Select options={categories} value={initValue} {...props} />
}

export default ProductCategorySelector
