import { createStackNavigator } from "@react-navigation/stack"

import React from "react"

import DrawerNavigator from "./DrawerNavigator"
import ProductDetail from "../containers/Product/screens/ProductDetail"
import CheckoutDone from "../containers/Cart/screens/CheckoutDone"
import ChangePassword from "../containers/Profile/screens/ChangePassword"
import GuaranteeOrderDetail from "../containers/GuaranteeOrder/screens/GuaranteeOrderDetail"
import screens from "../assets/constants/screens"

const Stack = createStackNavigator()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.HOME} component={DrawerNavigator} />
      <Stack.Screen name={screens.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={screens.CHECKOUT_DONE} component={CheckoutDone} />
      <Stack.Screen name={screens.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={screens.GUARANTEE_ORDER_DETAIL} component={GuaranteeOrderDetail} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
