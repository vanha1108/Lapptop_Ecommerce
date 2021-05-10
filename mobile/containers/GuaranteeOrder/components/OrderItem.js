import React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import metrics from "../../../assets/constants/metrics"
import utcToLocalTime from "../../../utils/utcToLocalTime"

const OrderItem = ({ order, onPress, onRemove }) => {
    return <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.head}>
            <Text><Text style={styles.textBold}>Product:</Text> {order.productName}</Text>
            <TouchableOpacity onPress={e => {
                e.stopPropagation()
                onRemove()
            }}>
                <Text style={[styles.textBold, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
        </View>
        <Text><Text style={styles.textBold}>Start guarantee date: </Text>{utcToLocalTime(order.startDate, "dd-MM-yyyy")}</Text>
        <Text><Text style={styles.textBold}>End guarantee date: </Text>{utcToLocalTime(order.endDate, "dd-MM-yyyy")}</Text>
        {order.guaranteeServiceOn 
            ? <Text style={styles.textServiceOn}>Guarantee service ON</Text>
            : <Text style={styles.textServiceOff}>Guarantee service expired</Text>}
    </TouchableOpacity>
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
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        alignItems: "flex-start"
    },
    deleteText: {
        color: metrics.colorRed
    },
    textBold: {
        fontWeight: "700"
    },
    textServiceOn: {
        fontWeight: "700",
        color: metrics.colorGreen,
    },
    textServiceOff: {
        fontWeight: "700",
        color: metrics.colorRed
    }
})