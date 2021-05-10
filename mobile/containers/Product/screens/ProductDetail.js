import React from "react"
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import ImageSlider from "react-native-image-slider"
import { WebView } from "react-native-webview"
import Modal from "react-native-modal"
import { AntDesign } from "@expo/vector-icons"

import metrics from "../../../assets/constants/metrics"

import Header from "../../../components/Header/Header"
import CustomButton from "../../../components/Buttons/CustomButton"

import useProductDetail from "../hooks/useProductDetail"
import useCart from "../../Cart/hooks/useCart"

const ProductDetail = () => {
    const {
        params: { product },
    } = useRoute()
    
    const { html, isVisible, setIsVisible } = useProductDetail(product?._id)
    const { addProduct } = useCart()

    const renderModal = () => <Modal isVisible={isVisible}>
        <View style={styles.modal}>
            <View style={styles.closeModal}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                    <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <WebView 
                originWhitelist={["*"]}
                source={{ html: html.replace("$VIDEO_SRC$", product.video) }}
                mixedContentMode="always"
                javaScriptEnabled
                style={styles.webview}
            /> 
        </View>
    </Modal>

    return (
        <SafeAreaView>
                <View style={styles.container}>
                    <Header title={product.name} />
                    {renderModal()}
                    <View style={styles.slider}>
                        <ImageSlider 
                            loopBothSides
                            autoPlayWithInterval={2000}
                            images={product.images}
                        />
                    </View>
                    {!!product && !!product.video && <TouchableOpacity onPress={() => setIsVisible(true)}>
                        <Text style={styles.viewVideoBtn}>View video</Text>
                    </TouchableOpacity>}
                    <View style={styles.infoArea}>
                        <Text style={styles.marginBottom}>{product.description}</Text>
                        <Text style={styles.marginBottom}>Category: {product.category && product.category.name}</Text>
                        <Text style={styles.marginBottom}>CPU: {product.cpu}</Text>
                        <Text style={styles.marginBottom}>Hard disk: {product.hardDisk}</Text>
                        <Text style={styles.marginBottom}>RAM: {product.ram}</Text>
                        <Text style={styles.marginBottom}>Monitor: {product.monitor}</Text>
                        <Text style={styles.marginBottom}>VGA card: {product.vgaCard}</Text>
                        <Text style={styles.marginBottom}>Guarantee duration: {product.guaranteeDuration} months</Text>
                    </View>
                    {!!product.quantity && <View style={styles.addToCartArea}>
                        <CustomButton 
                            label="Add to cart"
                            style={styles.addToCart}
                            onPress={() => addProduct({ productId: product._id, count: 1 })}
                        /> 
                    </View>}
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 70,
        height: metrics.screenHeight,
        backgroundColor: metrics.colorWhite
    },
    slider: {
        height: 250
    },
    infoArea: {
        paddingTop: 16,
        paddingHorizontal: 16
    },
    marginBottom: {
        marginBottom: 8
    },
    modal: {
        backgroundColor: metrics.colorWhite,
        borderRadius: 8,
        position: "absolute",
        bottom: -16,
        width: metrics.screenWidth,
        marginLeft: -20
    },
    closeModal: {
        width: "100%",
        alignItems: "flex-end",
        paddingTop: 8,
        paddingRight: 8
    },
    webview: {
        height: 250
    },
    viewVideoBtn: {
        textDecorationLine: "underline",
        paddingLeft: 16,
        paddingTop: 8,
        fontWeight: "700",
        color: metrics.colorPrimaryText
    },
    addToCartArea: {
        position: "absolute",
        bottom: 8,
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 8
    },
    addToCartButton: {
        marginHorizontal: 8,
        width: metrics.screenWidth * 0.96
    }
})

export default ProductDetail
