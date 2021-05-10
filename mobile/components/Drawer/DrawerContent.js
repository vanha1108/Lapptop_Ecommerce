import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

import BackButton from "../Buttons/BackButton"

import fonts from "../../assets/constants/fonts"
import icons from "../../assets/constants/icons"
import screens from "../../assets/constants/screens"
import metrics from "../../assets/constants/metrics"

import { ACCESS_TOKEN } from "../../utils/constants"
import { setIsLogin } from "../../redux/commons/action"

const data = [
  { name: screens.NOTIFICATION, title: "Notifications", icon: icons.laptop },
  { name: screens.PRODUCT_LIST, title: "Product list", icon: icons.laptop },
  { name: screens.PROFILE, title: "Profile", icon: icons.profile },
  { name: screens.CART, title: "Cart", icon: icons.cart },
  { name: screens.CHAT, title: "Chat", icon: icons.messenger },
  { name: screens.BUYING_HISTORY, title: "Buying history", icon: icons.history },
  { name: screens.GUARANTEE, title: "Guarantee checking", icon: icons.fix },
  { name: screens.GUARANTEE_ORDER_LIST, title: "Guarantee orders", icon: icons.document },
  { name: screens.CONTACT, title: "Contact", icon: icons.contact },
]

const MenuItem = ({ notifications, onPress, icon, title, name }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image source={icon} style={styles.itemIcon} />
    <Text style={styles.itemText}>{title}</Text>
    {notifications && notifications.includes(name) && <View style={styles.notiDot}></View>}
  </TouchableOpacity>
)

const DrawerContent = ({ navigation }) => {
  const dispatch = useDispatch()
  const email = useSelector(state => state.commons.user?.email)
  const notifications = useSelector(state => state.commons.notifications)
  const handleBack = () => navigation.closeDrawer()

  const logOut = useCallback(async () => {
    await AsyncStorage.removeItem(ACCESS_TOKEN)
    dispatch(setIsLogin(false))
  }, [dispatch])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.top}>
        <BackButton onPress={handleBack} />
        <View style={styles.topText}>
          <Text style={styles.appName}>Laptop Ecommerce</Text>
          <Text style={styles.appDesc}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <MenuItem
            notifications={notifications}
            onPress={() => navigation.navigate(item.name)}
            title={item.title}
            icon={item.icon}
            name={item.name}
          />
        )}
      />
      <MenuItem onPress={logOut} title="Sign out" icon={icons.logout} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
    paddingLeft: 12,
    alignItems: "center",
  },
  topText: {
    marginLeft: 26,
  },
  appName: {
    fontFamily: fonts.POPPINS_SEMIBOLD,
    fontSize: 18,
    color: metrics.colorDark,
  },
  appDesc: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 12,
    color: metrics.colorDark,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  itemIcon: {
    width: 21,
    height: 21,
    marginLeft: 35,
  },
  itemText: {
    marginTop: 4,
    marginLeft: 15,
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: metrics.colorDark,
  },
  notiDot: {
    width: 10,
    height: 10,
    backgroundColor: metrics.colorRed,
    borderRadius: 50,
    marginLeft: 16
  }
})

export default DrawerContent
