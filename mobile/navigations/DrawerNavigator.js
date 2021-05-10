import React from "react"
import { StyleSheet } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import DrawerContent from "../components/Drawer/DrawerContent"
import ProductList from "../containers/Product/screens/ProductList"
import Profile from "../containers/Profile/screens/Profile"
import Cart from "../containers/Cart/screens/Cart"
import Chat from "../containers/Chat/screens/Chat"
import Contact from "../containers/Contact/screens/Contact"
import BuyingHistory from "../containers/BuyingHistory/screens/BuyingHistory"
import Guarantee from "../containers/Guarantee/screens/Guarantee"
import GuaranteeOrderList from "../containers/GuaranteeOrder/screens/GuaranteeOrderList"
import NotificationList from "../containers/Notification/screens/NotificationList"

import screens from "../assets/constants/screens"

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name={screens.NOTIFICATION} component={NotificationList} />
      <Drawer.Screen name={screens.PRODUCT_LIST} component={ProductList} />
      <Drawer.Screen name={screens.PROFILE} component={Profile} />
      <Drawer.Screen name={screens.CART} component={Cart} />
      <Drawer.Screen name={screens.CHAT} component={Chat} />
      <Drawer.Screen name={screens.CONTACT} component={Contact} />
      <Drawer.Screen name={screens.BUYING_HISTORY} component={BuyingHistory} />
      <Drawer.Screen name={screens.GUARANTEE} component={Guarantee} />
      <Drawer.Screen name={screens.GUARANTEE_ORDER_LIST} component={GuaranteeOrderList} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawer: {
    width: 287,
  },
})

export default DrawerNavigator
