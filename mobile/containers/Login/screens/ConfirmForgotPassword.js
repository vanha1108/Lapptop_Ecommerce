import React, { useState } from "react"
import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native"
import { useDispatch } from "react-redux"

import metrics from "../../../assets/constants/metrics"
import screens from "../../../assets/constants/screens"

import Header from "../../../components/Header/Header"
import CustomButton from "../../../components/Buttons/CustomButton"
import CustomInput from "../../../components/Inputs/CustomInput"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"

import { confirmForgotPassword } from "../../../services/accountServices"
import { setLoading } from "../../../redux/commons/action"
import navigation from "../../../navigations/rootNavigation"
import validations from "../../../utils/validations"

const ConfirmForgotPassword = () => {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const [token, setToken] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const confirm = async () => {
        setChecked(true)
        if (!token || !token.trim()) return
        if (passwordInvalid) return
        dispatch(setLoading(true))

        try {
            await confirmForgotPassword({ token, newPassword })
            Alert.alert("Password changed successfully", "", [
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

    const passwordInvalid = !validations.password(newPassword)

    return <SafeAreaView>
        <View style={styles.container}>
            <Header title="Confirm forgot password" exceptCart exceptDrawer />
            <View style={styles.content}>
                <Text style={styles.text}>
                    Check your email to get confirmation code.
                </Text>
                <View style={styles.tokenInput}>
                    <CustomInput
                        placeholder="Confirmation code"
                        value={token}
                        onChangeText={value => setToken(value)}
                    />
                </View>
                <CustomInput
                    placeholder="New password"
                    value={newPassword}
                    isPassword
                    icon="lock"
                    onChangeText={value => setNewPassword(value)}
                    isInvalid={checked && passwordInvalid}
                    onBlur={() => setChecked(true)}
                />
                {checked && passwordInvalid && <ErrorHandler text="Password is invalid" />}
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
    },
    tokenInput: {
        marginBottom: 8
    }
})

export default ConfirmForgotPassword