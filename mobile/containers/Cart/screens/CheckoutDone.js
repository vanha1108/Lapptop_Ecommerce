import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"

import CustomButton from "../../../components/Buttons/CustomButton"
import Header from "../../../components/Header/Header"
import metrics from "../../../assets/constants/metrics"
import screens from "../../../assets/constants/screens"
import navigation from "../../../navigations/rootNavigation"

const CheckoutDone = () => {
    return <SafeAreaView>
         <View style={styles.container}>
            <Header title="Checkout" exceptCart />
            <View style={styles.content}>
                <Text style={styles.text}>You have created an order successfully. We have sent an email to you.</Text>
                <CustomButton 
                    label="Back to product list"
                    style={styles.button}
                    onPress={() => navigation.navigate(screens.PRODUCT_LIST)}
                />
            </View>
        </View>
    </SafeAreaView>
}

export default CheckoutDone

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight,
        backgroundColor: metrics.colorWhite,
        position: "relative"
    },
    content: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        padding: 16,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600"
    },
    button: {
        marginHorizontal: 8,
        // width: metrics.screenWidth * 0.96
    }
})