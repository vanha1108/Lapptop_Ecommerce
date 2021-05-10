import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import metrics from "../../../assets/constants/metrics"

const ProductItem = ({ product, onPress, addProduct, removeProduct, count, removeAllow }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <View style={styles.header}>
                <Text style={styles.text}>{product.name}</Text>
                {removeAllow && <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation()
                        removeProduct(product._id)
                    }}
                >
                    <AntDesign name="delete" size={24} color="black"/>
                </TouchableOpacity>}
            </View>
            <Image source={{ uri: product.images[0] }} style={styles.image} />
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>{product.price}</Text>
                <View style={styles.countArea}>
                    {!!count && !!removeProduct && <>
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation()
                                count > 1 
                                    ? addProduct({ productId: product._id, count: -1 })
                                    : removeProduct(product._id)
                            }}
                        >
                            <AntDesign name="minuscircleo" size={24} color="black"/>
                        </TouchableOpacity>
                        <Text style={styles.count}>{count}</Text>
                    </>}
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation()
                            addProduct({ productId: product._id, count: 1 })
                        }}
                    >
                        <AntDesign name="pluscircleo" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: metrics.colorLight,
        flexGrow: 1,
        marginBottom: 16,
        width: metrics.screenWidth * 0.4,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },  
    text: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
    },
    image: {
        width: "100%",
        height: 120,
        marginBottom: 8,
    },
    description: {
        fontSize: 13,
        marginBottom: 8,
        maxWidth: metrics.screenWidth / 3,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
    },
    countArea: {
        flexDirection: "row",
        alignItems: "center"
    },
    count: {
        fontWeight: "700",
        marginHorizontal: 8
    }
})
