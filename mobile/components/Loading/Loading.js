import React from "react"
import { useSelector } from "react-redux"
import { View, StyleSheet } from "react-native"
import { MaterialIndicator } from "react-native-indicators"

import metrics from "../../assets/constants/metrics"

const Loading = () => {
    const isLoading = useSelector(state => state.commons.isLoading)
    return isLoading
        ? <View style={styles.container}>
            <MaterialIndicator color="#ff7979" count={3} />
        </View>
        : null
}

export default Loading

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: metrics.colorOverlay,
        alignItems: "center",
        justifyContent: "center"
    }
})
