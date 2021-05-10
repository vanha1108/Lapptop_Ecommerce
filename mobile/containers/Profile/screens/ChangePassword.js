import React, { useState } from "react"
import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native"
import { useDispatch } from "react-redux"

import metrics from "../../../assets/constants/metrics"
import screens from "../../../assets/constants/screens"

import Header from "../../../components/Header/Header"
import CustomButton from "../../../components/Buttons/CustomButton"
import CustomInput from "../../../components/Inputs/CustomInput"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"

import { changePassword } from "../../../services/profileService"
import { setLoading } from "../../../redux/commons/action"
import navigation from "../../../navigations/rootNavigation"
import validations from "../../../utils/validations"

const ChangePassword = () => {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const confirm = async () => {
        setChecked(true)
        if (passwordInvalid || newPasswordInvalid) return
        dispatch(setLoading(true))

        try {
            await changePassword({ password, newPassword })
            Alert.alert("Password changed successfully", "", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate(screens.PROFILE)
                }
            ])
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }

    const passwordInvalid = !validations.password(password)
    const newPasswordInvalid = !validations.password(newPassword)

    return <SafeAreaView>
        <View style={styles.container}>
            <Header title="Change password" exceptCart exceptDrawer />
            <View style={styles.content}>
                <View style={styles.passwordInput}>
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        isPassword
                        icon="lock"
                        onChangeText={value => setPassword(value)}
                        isInvalid={checked && passwordInvalid}
                    />
                    {checked && passwordInvalid && <ErrorHandler text="Password is invalid" />}
                </View>
                <CustomInput
                    placeholder="New password"
                    value={newPassword}
                    isPassword
                    icon="lock"
                    onChangeText={value => setNewPassword(value)}
                    isInvalid={checked && newPasswordInvalid}
                    onBlur={() => setChecked(true)}
                />
                {checked && newPasswordInvalid && <ErrorHandler text="New password is invalid" />}
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
    passwordInput: {
        marginBottom: 8
    }
})

export default ChangePassword