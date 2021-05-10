import React, { useCallback } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"

import metrics from "../../assets/constants/metrics"

const BackButton = ({ onPress, style }) => {
  const navigation = useNavigation()
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress()
    } else {
      navigation.goBack()
    }
  }, [navigation, onPress])
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={handlePress}
    >
      <AntDesign name="arrowleft" size={20} color="#fff" />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    width: 43,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: metrics.colorPrimary,
  },
})
