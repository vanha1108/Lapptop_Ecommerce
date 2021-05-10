import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import fonts from "../../assets/constants/fonts"
import metrics from "../../assets/constants/metrics"
import shadowStyle from "../../styles/shadow"

const CustomButton = (props) => {
  const { label, onPress, style, textStyle, isDisabled } = props

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[styles.btn, isDisabled && styles.disabled, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 8,
    height: 51,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: metrics.colorPrimary,
    ...shadowStyle,
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: metrics.colorWhite,
    fontSize: 16,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
})
