import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { logIn } from "../../../services/accountServices"
import { setLoading, setUser, setIsLogin } from "../../../redux/commons/action"
import { ACCESS_TOKEN } from "../../../utils/constants"

const useLogin = () => {
  const dispatch = useDispatch()

  const userLogin = useCallback(
    async (data) => {
      dispatch(setLoading(true))

      try {
        const res = await logIn(data)
        AsyncStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
        dispatch(setUser(res.data.data))
        dispatch(setIsLogin(true))
      } catch (err) {
          Alert.alert(err.message)
      }

      dispatch(setLoading(false))
    },
    [dispatch]
  )

  return { userLogin }
}

export default useLogin
