import React from "react"
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native"

import metrics from "../../../assets/constants/metrics"

import Header from "../../../components/Header/Header"
import ProductItem from "../../Product/components/ProductItem"
import CustomButton from "../../../components/Buttons/CustomButton"

import useCart from "../hooks/useCart"

const Cart = () => {
    const { cart, addProduct, removeProduct, goToDetail, userCheckout } = useCart()

    return <SafeAreaView>
        <View style={styles.container}>
            <Header title="Cart" exceptCart />
            <View style={styles.cartArea}>
                {!!cart && !!cart.length 
                    ? <FlatList
                        numColumns={2}
                        data={cart}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <ProductItem
                                product={item.product}
                                onPress={() => goToDetail(item)}
                                addProduct={addProduct}
                                removeProduct={removeProduct}
                                count={item.count}
                                removeAllow
                            />
                        )}
                    />
                    : <View>
                        <Text style={styles.noProduct}>No product.</Text>
                    </View>}
            </View>
            {!!cart && !!cart.length && <View style={styles.checkoutArea}>
                <CustomButton 
                    label="Ship COD"
                    style={[styles.checkoutButton, styles.codButton]}
                    onPress={() => userCheckout()}
                />
                <CustomButton 
                    label="Check out"
                    style={styles.checkoutButton}
                    onPress={() => userCheckout(true)}
                />  
            </View>}
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight,
        backgroundColor: metrics.colorWhite,
        position: "relative"
    },
    cartArea: {
        marginTop: 20,
        paddingBottom: 70
    },
    noProduct: {
        textAlign: "center"
    },
    checkoutArea: {
        position: "absolute",
        bottom: 8,
        width: "100%",
        alignItems: "center"
    },
    checkoutButton: {
        marginHorizontal: 8,
        width: metrics.screenWidth * 0.96
    },
    codButton: {
        marginBottom: 16,
        backgroundColor: metrics.colorRed
    }
})

export default Cart