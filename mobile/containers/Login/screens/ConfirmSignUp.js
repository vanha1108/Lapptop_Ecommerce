import React, { useState } from "react"
import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native"
import { useDispatch } from "react-redux"

import metrics from "../../../assets/constants/metrics"
import screens from "../../../assets/constants/screens"

import Header from "../../../components/Header/Header"
import CustomButton from "../../../components/Buttons/CustomButton"
import CustomInput from "../../../components/Inputs/CustomInput"

import { confirmSignUp } from "../../../services/accountServices"
import { setLoading } from "../../../redux/commons/action"
import navigation from "../../../navigations/rootNavigation"

const ConfirmSignUp = () => {
    const dispatch = useDispatch()
    const [pendingSignUpRequestId, setPendingSignUpRequestId] = useState("")
    const confirm = async () => {
        dispatch(setLoading(true))

        try {
            await confirmSignUp({ pendingSignUpRequestId })
            Alert.alert("Sign up successfully", "", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate(screens.LOGIN)
                }
            ])
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }

    return <SafeAreaView>
        <View style={styles.container}>
            <Header title="Confirm sign up" exceptCart exceptDrawer />
            <View style={styles.content}>
                <Text style={styles.text}>
                    Check your email to get confirmation code.
                </Text>
                <CustomInput
                    placeholder="Confirmation code"
                    value={pendingSignUpRequestId}
                    onChangeText={value => setPendingSignUpRequestId(value)}
                />
                <CustomButton 
                    label="Confirm"
                    style={styles.confirmBtn}
                    onPress={confirm}
                /> 
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight
    },
    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 8
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 16
    },  
    confirmBtn: {
        marginTop: 16,
        width: metrics.screenWidth * 0.96
    }
})

export default ConfirmSignUp