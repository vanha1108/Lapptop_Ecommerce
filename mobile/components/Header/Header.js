import React from "react"
import { View, Text, StyleSheet } from "react-native"

import OpenDrawerButton from "../Buttons/OpenDrawerButton"
import CartButton from "../Buttons/CartButton"

import metrics from "../../assets/constants/metrics"

const Header = ({ title, exceptCart, exceptDrawer }) => {
    return <View style={styles.container}>
        {!exceptDrawer && <OpenDrawerButton />}
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
        {!exceptCart && <CartButton />}
    </View>
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: metrics.screenWidth,
        height: 50,
        paddingHorizontal: 16,
        backgroundColor: metrics.colorPrimary,
        flexDirection: "row",
        alignItems: "center"
    },
    titleContainer: {
        flexGrow: 1,
        alignItems: "center",
        marginRight: 32
    },
    title: {
        color: "#fff",
        fontSize: 20
    }
})