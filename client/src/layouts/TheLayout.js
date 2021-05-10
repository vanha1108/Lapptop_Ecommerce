import React, { useEffect, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import TheContent from "./TheContent"
import TheHeader from "./TheHeader"
import TheFooter from "./TheFooter"
import TheSidebar from "./TheSidebar"
import Loading from "../components/Loading/Loading"

import { setLoading, setUser } from "../redux/commons/action"
import { getUserInfo } from "../services/accountServices"

import { ACCESS_TOKEN } from "../utils/constants"

import routes from "../configs/routes"
import navigations from "../configs/navigations"
import canAccessRoute from "../utils/canAccessRoute"

const TheLayout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.commons.user)

    const getData = useCallback(async () => {
        dispatch(setLoading(true))
        try {
            const res = await getUserInfo()
            dispatch(setUser(res.data))
        } catch (err) {
            localStorage.removeItem(ACCESS_TOKEN)
            history.push("/login")
        }
        dispatch(setLoading(false))
    }, [dispatch, history])

    useEffect(() => {
        getData()
    }, [getData])

    const authRoutes = useMemo(() => {
        return routes.filter((route) =>
            canAccessRoute(user?.roles, route.roles),
        )
    }, [user])

    const authNavigations = useMemo(() => {
        return navigations.filter((navigation) =>
            canAccessRoute(user?.roles, navigation.roles),
        )
    }, [user])

    if (!user) return <Loading />

    return (
        <div className="c-app c-default-layout">
            <TheSidebar navigations={authNavigations} />
            <div className="c-wrapper">
                <TheHeader />
                <div className="c-body">
                    <TheContent routes={authRoutes} />
                </div>
                <TheFooter />
            </div>
        </div>
    )
}

export default TheLayout
