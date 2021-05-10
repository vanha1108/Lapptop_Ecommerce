import React from "react"
import { StyleSheet, Image, Dimensions } from "react-native"
import images from "../../../assets/constants/images"

const { width, height } = Dimensions.get("window")
const Splash = () => {
  return (
    <Image source={images.splash} style={styles.container} resizeMode="cover" />
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
})
