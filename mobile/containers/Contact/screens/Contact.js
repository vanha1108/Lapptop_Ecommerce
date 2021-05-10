import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"

import CustomButton from "../../../components/Buttons/CustomButton"
import Header from "../../../components/Header/Header"
import metrics from "../../../assets/constants/metrics"
import screens from "../../../assets/constants/screens"
import navigation from "../../../navigations/rootNavigation"

const Contact = () => {
    return <SafeAreaView>
         <View style={styles.container}>
            <Header title="Contact" />
            <View style={styles.content}>
                <Text style={styles.title}>Stores:</Text>
                <Text style={styles.text}>Branch 1: 123 Giai Phong street. {"\n"}Phone number: 0123456789</Text>
                <Text style={styles.text}>Branch 2: 123 Giai Phong street. {"\n"}Phone number: 0123456789</Text>
                <Text style={styles.text}>Branch 3: 123 Giai Phong street. {"\n"}Phone number: 0123456789</Text>

                <Text style={styles.title}>Sale hotline: 0123456789</Text>
                <Text style={styles.title}>Customer service hotline: 0123456789</Text>
                <Text style={styles.title}>Working time: 8AM - 19PM</Text>

                <Text style={styles.text}>{"\u00A9"} Developed by hungdev.js</Text>
                <Text style={styles.text}>Phone number: 0123456789</Text>
            </View>
            <CustomButton 
                label="Back to product list"
                style={styles.button}
                onPress={() => navigation.navigate(screens.PRODUCT_LIST)}
            />
        </View>
    </SafeAreaView>
}

export default Contact

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight,
        backgroundColor: metrics.colorWhite,
    },
    content: {
        flex: 1,
    },
    title: {
        paddingHorizontal: 16,
        paddingTop: 8,
        fontSize: 18,
        fontWeight: "700"
    },
    text: {
        paddingHorizontal: 16,
        paddingTop: 8,
        fontSize: 16,
        fontWeight: "600"
    },
    button: {
        marginHorizontal: 8,
        // width: metrics.screenWidth * 0.96
    }
})