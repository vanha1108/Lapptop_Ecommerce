import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { setLoading, setAlert } from "../../../redux/commons/action"
import { getById, create, update } from "../../../services/productServices"

const initValue = {
    name: "",
    description: "",
    images: [],
    price: 0,
    quantity: 0,
    categories: [],
    cpu: "",
    ram: "",
    hardDisk: "",
    vgaCard: "",
    minitor: "",
    video: "",
}

const useProductDetail = () => {
    const dispatch = useDispatch()
    const [id, setId] = useState(0)
    const [productDetail, setProductDetail] = useState(initValue)

    const getData = useCallback(async () => {
        dispatch(setLoading(true))
        try {
            const res = await getById(id)
            setProductDetail(res.data)
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }
        dispatch(setLoading(false))
    }, [id, dispatch, setProductDetail])

    useEffect(() => {
        !!id ? getData() : setProductDetail(initValue)
    }, [id, getData])

    const confirmData = useCallback(
        async (values, cb) => {
            dispatch(setLoading(true))
            try {
                await (!!id ? update(id, values) : create(values))
                dispatch(
                    setAlert({
                        type: "success",
                        message: `${
                            !!id ? "Update" : "Create"
                        } product successfully`,
                    }),
                )
                cb && cb()
                !!id && setId(0)
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
        [id, dispatch],
    )
    return { id, setId, productDetail, confirmData, initValue }
}

export default useProductDetail
