import React from "react"
import { View, Text, StyleSheet } from "react-native"
import metrics from "../../../assets/constants/metrics"
import utcToLocalTime from "../../../utils/utcToLocalTime"

const OrderItem = ({ order }) => {
    return <View style={styles.container}>
        <Text><Text style={styles.textBold}>Order ID</Text> {order._id}</Text>
        <Text><Text style={styles.textBold}>Time </Text>{utcToLocalTime(order.createdAt, "dd-MM-yyyy")}</Text>

        <Text style={styles.textBold}>Product</Text>
        {order.products.map(item => <Text key={item.product._id}>- {item.product.name} x {item.count}</Text>)}

        <Text><Text style={styles.textStatus}>Status</Text> <Text style={styles.status}>{order.status}</Text></Text>
        {order.isPaid 
            ? <Text style={styles.textPaid}>Paid</Text>
            : <Text style={styles.textShipping}>Shipping</Text>}
    </View>
}

export default OrderItem

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: metrics.colorZircon,
        borderRadius: 10
    },
    textBold: {
        fontWeight: "700"
    },
    textPaid: {
        fontWeight: "700",
        color: metrics.colorGreen,
    },
    textShipping: {
        fontWeight: "700",
        color: metrics.colorYellow
    },
    textStatus: {
        fontWeight: "700",
        color: metrics.colorBlack
    },
    status: {
        color: metrics.colorBlack,
        textTransform: "uppercase"
    }
})