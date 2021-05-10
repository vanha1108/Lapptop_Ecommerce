import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"
import { navigationRef, isReadyRef } from "./rootNavigation"

import {
  setIsCheckingAuthentication,
  setIsLogin,
  setUser
} from "../redux/commons/action"
import { getUserInfo } from "../services/accountServices"

import Splash from "../containers/Splash/screens/Splash"

import AuthStackNavigator from "./AuthStackNavigator"
import HomeStackNavigator from "./HomeStackNavigator"
import { ACCESS_TOKEN } from "../utils/constants"

const AppNavigator = () => {
  const isLogin = useSelector((state) => state.commons.isLogin)
  const isCheckingAuthentication = useSelector(
    (state) => state.commons.isCheckingAuthentication
  )

  const dispatch = useDispatch()

  useEffect(() => {
    isReadyRef.current = false
    getData()
  }, [])

  const getData = async () => {
    try {
      const res = await getUserInfo()
      dispatch(setUser(res.data))
      dispatch(setIsCheckingAuthentication(false))
      dispatch(setIsLogin(true))
    } catch(err) {
      console.log(err)
      await AsyncStorage.removeItem(ACCESS_TOKEN)
      dispatch(setIsCheckingAuthentication(false))
    }
  }

  if (isCheckingAuthentication) {
    return <Splash />
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
    >
      {!isLogin ? <AuthStackNavigator /> : <HomeStackNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
