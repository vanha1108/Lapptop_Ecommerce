import { createStackNavigator } from "@react-navigation/stack"
import React from "react"

import LogIn from "../containers/Login/screens/Login"
import Profile from "../containers/Profile/screens/Profile"
import ConfirmSignUp from "../containers/Login/screens/ConfirmSignUp"
import ForgotPassword from "../containers/Login/screens/ForgotPassword"
import ConfirmForgotPassword from "../containers/Login/screens/ConfirmForgotPassword"
import screens from "../assets/constants/screens"

const Stack = createStackNavigator()

const SignUp = () => <Profile isSignUp/>

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.LOGIN} component={LogIn} />
      <Stack.Screen name={screens.SIGN_UP} component={SignUp} />
      <Stack.Screen name={screens.CONFIRM_SIGN_UP} component={ConfirmSignUp} />
      <Stack.Screen name={screens.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={screens.CONFIRM_FORGOT_PASSWORD} component={ConfirmForgotPassword} />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator
