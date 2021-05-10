import React from "react"
import { Provider } from "react-redux"
import { StatusBar } from "expo-status-bar"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaProvider } from "react-native-safe-area-context"
import AppLoading from "expo-app-loading"
import { useFonts } from "expo-font"

import PoppinsRegular from "./assets/fonts/Poppins-Regular.ttf"
import PoppinsMedium from "./assets/fonts/Poppins-Medium.ttf"
import PoppinsSemiBold from "./assets/fonts/Poppins-SemiBold.ttf"
import LatoBlack from "./assets/fonts/Lato-Black.ttf"
import LatoRegular from "./assets/fonts/Lato-Regular.ttf"

import Loading from "./components/Loading/Loading"
import AppNavigator from "./navigations/AppNavigator"

import store from "./store"
import { LogBox } from "react-native"

LogBox.ignoreAllLogs()

const App = () => {
  const [fontLoaded] = useFonts({
    PoppinsRegular,
    PoppinsMedium,
    PoppinsSemiBold,
    LatoBlack,
    LatoRegular,
  })

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <StatusBar style="auto" />
          <AppNavigator />
          <Loading />
        </RootSiblingParent>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
