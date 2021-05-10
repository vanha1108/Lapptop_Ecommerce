import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { setLoading, setAlert } from "../../../redux/commons/action"
import { getById, create, update } from "../../../services/userServices"

const initValue = {
    name: "",
    email: "",
    roles: [],
    phone: "",
    address: "",
}

const useUserDetail = () => {
    const dispatch = useDispatch()
    const [id, setId] = useState(0)
    const [userDetail, setUserDetail] = useState(initValue)

    const getData = useCallback(async () => {
        dispatch(setLoading(true))
        try {
            const res = await getById(id)
            setUserDetail(res.data)
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }
        dispatch(setLoading(false))
    }, [id, dispatch, setUserDetail])

    useEffect(() => {
        !!id ? getData() : setUserDetail(initValue)
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
                        } user successfully`,
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
    return { id, setId, userDetail, confirmData, initValue }
}

export default useUserDetail
