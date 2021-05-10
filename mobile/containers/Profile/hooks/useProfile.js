import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Alert } from "react-native"

import { setLoading } from "../../../redux/commons/action"
import { get, update } from "../../../services/profileService"
import { signUp } from "../../../services/accountServices"
import navigation from "../../../navigations/rootNavigation"
import screens from "../../../assets/constants/screens"

const useProfile = (isSignUp) => {
    const dispatch = useDispatch()
    const [profile, setProfile] = useState({})

    const getData = useCallback(async () => {
        dispatch(setLoading(true))

        try {
            const res = await get()
            setProfile(res.data)
        } catch (err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }, [dispatch])

    const updateData = useCallback(
        async (values) => {
            dispatch(setLoading(true))

            try {
                await update(values)
                Alert.alert("Update profile successfully")
            } catch (err) {
                Alert.alert(err.response?.data || err.message)
            }

            dispatch(setLoading(false))
        },
        [dispatch],
    )

    const userSignUp = useCallback(
        async (values) => {
            dispatch(setLoading(true))

            try {
                await signUp(values)
                navigation.navigate(screens.CONFIRM_SIGN_UP)
            } catch (err) {
                Alert.alert(err.response?.data || err.message)
            }

            dispatch(setLoading(false))
        },
        [dispatch]
    )

    useEffect(() => {
        !isSignUp && getData()
    }, [])

    return { profile, updateData, userSignUp }
}

export default useProfile
