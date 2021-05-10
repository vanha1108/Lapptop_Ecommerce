import { Dimensions } from "react-native"
import Constants from "expo-constants"

const { width, height } = Dimensions.get("window")

const metrics = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    appHeight: height - Constants.statusBarHeight,
    colorOverlay: "rgba(0, 0, 0, 0.4)",
    colorPrimary: "#3b5998",
    colorPrimaryDisabled: "#6593df",
    colorGray: "#333",
    colorLightGray: "#ddd",
    colorLight: "#eee",
    colorDarkGray: "#aaa",
    colorDarkerGray: "#ccc",
    colorIconGray: "#bbb",
    colorRed: "#ff4444",
    colorZircon: "#f4f8ff",
    colorDark: "#333c45",
    colorEbonyClay: "#242d3a",
    colorWhite: "#fff",
    colorPrimaryText: "#000000BF",
    colorSalmon: "#ff7676",
    colorTreePoppy: "#fd9426",
    colorWedgewood: "#5071a7",
    colorGreen: "#28a745",
    colorYellow: "#ffc107",
    colorBlack: "#000"
}

export default metrics
