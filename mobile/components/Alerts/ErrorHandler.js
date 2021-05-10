import React from "react"
import { Text, StyleSheet } from "react-native"

import metrics from "../../assets/constants/metrics"

const ErrorHandler = ({ text }) => <Text style={styles.error}>{text}</Text>

export default ErrorHandler

const styles = StyleSheet.create({
    error: {
        color: metrics.colorRed,
        fontSize: 12
    }
})