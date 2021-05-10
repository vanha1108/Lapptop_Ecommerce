import React from "react"
import { View, StyleSheet, SafeAreaView, RefreshControl, FlatList } from "react-native"

import OrderItem from "../components/OrderItem"
import Header from "../../../components/Header/Header"
import metrics from "../../../assets/constants/metrics"

import useBuyingHistory from "../hooks/useBuyingHistory"

const BuyingHistory = () => {
    const { orders, isLoading, getData } = useBuyingHistory()

    return <SafeAreaView>
         <View style={styles.container}>
            <Header title="Buying history" />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={getData}
                    />
                }
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <OrderItem
                        order={item}
                    />
                )}
            />
        </View>
    </SafeAreaView>
}

export default BuyingHistory

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight,
        backgroundColor: metrics.colorWhite,
    }
})