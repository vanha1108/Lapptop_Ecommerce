import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"

import shadowStyle from "../../../styles/shadow"
import metrics from "../../../assets/constants/metrics"

const CategoryItem = ({ category, isActive, onPress }) => {
    const isTop = ["hottest", "newest"].includes(category._id)
    return (
        <TouchableOpacity
            style={[styles.container, isActive && styles.active, isTop && isActive && styles.isTop]}
            onPress={onPress}
        >
            <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: metrics.colorLightGray,
        ...shadowStyle,
    },
    active: {
        backgroundColor: metrics.colorPrimaryDisabled,
    },
    text: {
        fontSize: 12,
        fontWeight: "600",
    },
    isTop: {
        backgroundColor: metrics.colorSalmon
    }
})
