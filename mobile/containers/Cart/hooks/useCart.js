import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Alert } from "react-native"
import { PaymentsStripe as Stripe } from "expo-payments-stripe"

import { setLoading } from "../../../redux/commons/action"
import { setCart } from "../../../redux/cart/action"
import { get, add, remove, checkout } from "../../../services/cartService"
import screens from "../../../assets/constants/screens"
import navigation from "../../../navigations/rootNavigation"
import { STRIPE_PUBLISHABLE_KEY } from "../../../utils/constants"

const useCart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)

    const getData = useCallback(async () => {
        dispatch(setLoading(true))

        try {
            const res = await get()
            dispatch(setCart(res.data))
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }, [dispatch])

    const addProduct = useCallback(async ({ productId, count }) => {
        dispatch(setLoading(true))

        try {
            await add({ productId, count })
            const res = await get()
            dispatch(setCart(res.data))
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }, [dispatch])

    const removeProduct = useCallback(async (productId) => {
        dispatch(setLoading(true))

        try {
            await remove(productId)
            const res = await get()
            dispatch(setCart(res.data))
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }, [dispatch])

    const goToDetail = useCallback((product) => {
        navigation.navigate(screens.PRODUCT_DETAIL, { product })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    const userCheckout = useCallback(async (isPaid = false) => {
        try {
            let tokenId = null
            if (isPaid) {
                await Stripe.setOptionsAsync({
                    publishableKey: STRIPE_PUBLISHABLE_KEY,
                })
        
                const data = await Stripe.paymentRequestWithCardFormAsync()
                tokenId = data.tokenId
                dispatch(setLoading(true))
                await checkout(tokenId)

                navigation.navigate(screens.CHECKOUT_DONE)
                await getData()
            } else {
                Alert.alert(
                    "Confirm order", 
                    "Do you want us to ship these products to your address?",
                    [
                        {
                          text: "OK",
                          onPress: async () => {
                            dispatch(setLoading(true))
                            try {
                                await checkout(tokenId)

                                navigation.navigate(screens.CHECKOUT_DONE)
                                await getData()
                            } catch(err) {
                                Alert.alert(err.response?.data || err.message)
                            }
                            dispatch(setLoading(false))
                          },
                        },
                        {
                            text: "Cancel",
                            onPress: () => {}
                        }
                    ],
                )
            }
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        } finally {
            dispatch(setLoading(false))
        }
    }, [])

    return { cart, getData, addProduct, removeProduct, goToDetail, userCheckout }
}

export default useCart