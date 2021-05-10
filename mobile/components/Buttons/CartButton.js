import React, { useCallback } from "react"
import { useSelector } from "react-redux"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"

import screens from "../../assets/constants/screens"
import metrics from "../../assets/constants/metrics"

const CartButton = ({ onPress, style }) => {
    const navigation = useNavigation()
    const cart = useSelector(state => state.cart.cart)

    const length = cart.length

    const handlePress = useCallback(() => {
        if (onPress) {
        onPress()
        } else {
        navigation.navigate(screens.CART)
        }
    }, [navigation, onPress])
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.container, style]}
            onPress={handlePress}
        >
            <AntDesign name="shoppingcart" size={30} color="#fff" />
            {!!length && <View style={styles.countArea}>
                <Text style={styles.count}>{length}</Text>
            </View>}
        </TouchableOpacity>
    )
}

export default CartButton

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    countArea: {
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
    count: {
        color: metrics.colorRed,
        fontWeight: "700"
    }
})
