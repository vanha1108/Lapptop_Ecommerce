import React from "react"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Formik } from "formik"
import * as yup from "yup"

import metrics from "../../../assets/constants/metrics"
import screens from "../../../assets/constants/screens"
import validations from "../../../utils/validations"
import navigation from "../../../navigations/rootNavigation"

import Header from "../../../components/Header/Header"
import CustomInput from "../../../components/Inputs/CustomInput"
import CustomButton from "../../../components/Buttons/CustomButton"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"

import useProfile from "../hooks/useProfile"
import { TouchableOpacity } from "react-native-gesture-handler"

const Profile = ({ isSignUp = false}) => {
    const { profile, updateData, userSignUp } = useProfile(isSignUp)

    const schema = yup.object({
        email: yup.string().trim().email("Email is invalid").nullable().test("Test email", "Email is required", value => !isSignUp || !!value && !!value.trim()),
        name: yup.string().trim().required("Name is required"),
        address: yup.string().trim().required("Address is required"),
        phone: yup
            .string()
            .trim()
            .required("Phone number is required")
            .test("Test phone number", "Phone number is invalid", (value) =>
                validations.phone(value),
            ),
        password: yup.string().trim().nullable().test("Test password", "Password invalid", value => !isSignUp || validations.password(value))
    })

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Header 
                    title={!isSignUp ? "Profile" : "Sign up"} 
                    exceptCart={!!isSignUp} 
                    exceptDrawer={!!isSignUp} 
                />
                <KeyboardAwareScrollView
                    extraScrollHeight={100}
                    enableOnAndroid
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                >
                    <Formik
                        validationSchema={schema}
                        initialValues={profile}
                        enableReinitialize
                        onSubmit={(values) => {
                            !isSignUp 
                                ? updateData(values)
                                : userSignUp(values)
                        }}
                    >
                        {(formikProps) => {
                            const {
                                values,
                                errors,
                                touched,
                                setFieldValue,
                                handleBlur,
                                handleSubmit,
                            } = formikProps

                            const fields = [
                                {
                                    field: "name",
                                    label: "Name",
                                    icon: "user",
                                },
                                {
                                    field: "address",
                                    label: "Address",
                                    icon: "home",
                                },
                                {
                                    field: "phone",
                                    label: "Phone number",
                                    icon: "phone",
                                },
                            ]

                            if (isSignUp) {
                                fields.unshift({
                                    field: "email",
                                    label: "Email",
                                    icon: "mail"
                                })
                                fields.push({
                                    field: "password",
                                    label: "Password",
                                    icon: "lock"
                                })
                            }

                            return (
                                <View style={styles.contentArea}>
                                    <View style={styles.fieldArea}>
                                        {fields.map((input) => (
                                            <View
                                                key={input.field}
                                                style={styles.inputField}
                                            >
                                                <Text style={styles.inputLabel}>
                                                    {input.label}
                                                </Text>
                                                <CustomInput
                                                    placeholder={input.label}
                                                    icon={input.icon}
                                                    value={values[input.field]}
                                                    name={input.field}
                                                    isPassword={
                                                        input.field ===
                                                        "password"
                                                    }
                                                    isInvalid={
                                                        touched[input.field] &&
                                                        errors[input.field]
                                                    }
                                                    onChangeText={(value) =>
                                                        setFieldValue(
                                                            input.field,
                                                            value,
                                                        )
                                                    }
                                                    onBlur={handleBlur(
                                                        input.field,
                                                    )}
                                                    keyboardType={
                                                        input.keyboardType
                                                    }
                                                />
                                                {touched[input.field] &&
                                                errors[input.field] ? (
                                                    <ErrorHandler
                                                        text={
                                                            errors[input.field]
                                                        }
                                                    />
                                                ) : (
                                                    false
                                                )}
                                            </View>
                                        ))}
                                    </View>

                                    {!isSignUp && <TouchableOpacity onPress={() => navigation.navigate(screens.CHANGE_PASSWORD)}>
                                        <Text style={styles.changePasswordBtn}>Change password</Text>
                                    </TouchableOpacity>}

                                    <CustomButton
                                        label={!isSignUp ? "Update" : "Sign up"}
                                        style={styles.updateButton}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            )
                        }}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight,
    },
    contentArea: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    fieldArea: {
        marginBottom: 16,
    },
    inputField: {
        marginBottom: 8,
    },
    inputLabel: {
        color: metrics.colorDarkGray,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
    },
    updateButton: {
        backgroundColor: metrics.colorPrimary,
        marginTop: metrics.appHeight * 0.05,
    },
    changePasswordBtn: {
        color: metrics.colorPrimaryDisabled,
        fontSize: 14,
        textDecorationLine: "underline"
    }
})

export default Profile
