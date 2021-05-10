import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"

import Header from "../../../components/Header/Header"
import metrics from "../../../assets/constants/metrics"
import SearchBox from "../../../components/Inputs/SearchBox"

import useGuarantee from "../hooks/useGuarantee"
import remainGuarantee from "../../../utils/remainGuarantee"

const Guarantee = () => {
    const { searchString, setSearchString, order } = useGuarantee()

    return <SafeAreaView>
         <View style={styles.container}>
            <Header title="Guarantee checking" />
            <View style={styles.content}>
                <SearchBox 
                    placeholder="Type order ID to check guarantee service"
                    value={searchString}
                    onSearch={search => setSearchString(search)}
                />
                {order
                    ? <View style={styles.guaranteeContent}>
                        <Text style={styles.textBold}>Order ID {order._id}</Text>
                        <Text>Product</Text>
                        {order.products.map(item => {
                            const guaranteeStatus = remainGuarantee(order.createdAt, item.product.guaranteeDuration)
                            return <View>
                                <Text key={item.product._id}>{item.product.name}</Text>
                                <Text>Quantity: {item.count}</Text>
                                <Text>Buy date: {new Date(order.createdAt).toDateString()}</Text>
                                <Text>Guarantee expire at: {new Date(guaranteeStatus.expireTime).toDateString()}</Text>
                                {guaranteeStatus.remainTime <= 0 && <Text>Guarantee duration expired!</Text>}
                            </View>
                        })}
                    </View>
                    : <Text style={styles.textCenter}>No data.</Text>}
            </View>
        </View>
    </SafeAreaView>
}

export default Guarantee

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight,
        backgroundColor: metrics.colorWhite,
    },
    content: {
        padding: 8
    },
    textCenter: {
        marginTop: 8,
        textAlign: "center"
    },
    guaranteeContent: {
        margin: 8
    },
    textBold: {
        fontWeight: "700"
    }
})