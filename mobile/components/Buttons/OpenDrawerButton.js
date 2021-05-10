import React, { useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { TouchableOpacity, StyleSheet, View, Text } from "react-native"
import { useNavigation, useNavigationState } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import Pusher from "pusher-js/react-native"

import pusherConfig from "../../containers/Chat/configs/pusherConfig.json"
import { addNotification } from "../../redux/commons/action"
import metrics from "../../assets/constants/metrics"

const OpenDrawerButton = ({ onPress, style }) => {
  const user = useSelector(state => state.commons.user)
  const notifications = useSelector(state => state.commons.notifications)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const state = useNavigationState(state => state)
  const routeName = state.routes[state.index].name
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress()
    } else {
      navigation.openDrawer()
    }
  }, [navigation, onPress])

  useEffect(() => {
    let channel
    if (!!user) {
      const pusher = new Pusher(pusherConfig.key, pusherConfig)
      channel = pusher.subscribe(
          `NOTIFICATION-${user._id}`,
      )

      channel.bind("NEW_NOTIFICATION", (data) => {
        if (data !== routeName && ["BUYING_HISTORY", "CHAT", "NOTIFICATION"].includes(data)) {
          dispatch(addNotification(data))
        }
      })
    }

    return () =>
        channel &&
        channel.unsubscribe(`NOTIFICATION-${user._id}`)
}, [user, routeName])

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={handlePress}
    >
      <AntDesign name="bars" size={30} color="#fff" />
      {!!notifications.length && <View style={styles.notiArea}>
          <Text style={styles.noti}>{notifications.length}</Text>
      </View>}
    </TouchableOpacity>
  )
}

export default OpenDrawerButton

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  notiArea: {
    position: "absolute",
    top: -4,
    right: -4,
    borderRadius: 50,
    backgroundColor: metrics.colorWhite,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  noti: {
      color: metrics.colorRed,
      fontWeight: "700"
  }
})
