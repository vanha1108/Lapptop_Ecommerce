import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { logIn } from "../../../services/accountServices"
import { setLoading, setUser, setAlert } from "../../../redux/commons/action"
import { ACCESS_TOKEN } from "../../../utils/constants"

const initData = {
    email: "",
    password: "",
}

const HOME_PAGE_ADMIN = "/"
const HOME_PAGE_SELLER = "/orders"
const HOME_PAGE_TECHNICIAN ="/chat"

const useLogin = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [data, setData] = useState(initData)
    const changeData = useCallback(
        (valueObject) => {
            setData({
                ...data,
                ...valueObject,
            })
        },
        [data],
    )

    const userLogin = useCallback(async () => {
        dispatch(setLoading(true))

        try {
            const res = await logIn(data)
            dispatch(setUser(res.data.data))
            localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
            const { roles } = res.data.data
            const url = roles.includes("Admin")
                ? HOME_PAGE_ADMIN
                : roles.includes("Seller")
                    ? HOME_PAGE_SELLER
                    : HOME_PAGE_TECHNICIAN
            history.push(url)
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }

        dispatch(setLoading(false))
    }, [dispatch, history, data])

    return { data, changeData, userLogin }
}

export default useLogin
