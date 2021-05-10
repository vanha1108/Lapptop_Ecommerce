import React from "react"
import { useNavigation } from "@react-navigation/native"
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import CustomButton from "../../../components/Buttons/CustomButton"
import CustomInput from "../../../components/Inputs/CustomInput"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"

import metrics from "../../../assets/constants/metrics"
import screens from "../../../assets/constants/screens"
import validations from "../../../utils/validations"

import useLogin from "../hooks/useLogin"

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email is invalid")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .test("validate password", "Password is invalid", (value) =>
      validations.password(value)
    ),
})

const LogIn = () => {
  const { userLogin } = useLogin()
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logInArea}>
            <View style={styles.textArea}>
              <Text style={styles.logInText}>Log In</Text>
              <Text style={styles.welcomeText}>
                Welcome back to Laptop Ecommerce!
              </Text>
            </View>
            <Formik
              validationSchema={schema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                const { email, password } = values
                userLogin({ email, password })
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
                    field: "email",
                    label: "E-mail",
                    icon: "mail",
                    keyboardType: "email-address",
                  },
                  { field: "password", label: "Password", icon: "lock" },
                ]

                return (
                  <View>
                    <View style={styles.fieldArea}>
                      {fields.map((input) => (
                        <View key={input.field} style={styles.inputField}>
                          <Text style={styles.inputLabel}>{input.label}</Text>
                          <CustomInput
                            placeholder={input.label}
                            icon={input.icon}
                            value={values[input.field]}
                            name={input.field}
                            isPassword={input.field === "password"}
                            isInvalid={
                              touched[input.field] && errors[input.field]
                            }
                            onChangeText={(value) =>
                              setFieldValue(input.field, value)
                            }
                            onBlur={handleBlur(input.field)}
                            keyboardType={input.keyboardType}
                          />
                          {touched[input.field] && errors[input.field] ? (
                            <ErrorHandler text={errors[input.field]} />
                          ) : (
                            false
                          )}
                        </View>
                      ))}
                      <View style={styles.footer}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => navigation.navigate(screens.FORGOT_PASSWORD)
                          }
                        >
                          <Text style={styles.forgotPasswordText}>
                            Forgot password?
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            navigation.navigate(screens.SIGN_UP)
                          }
                        >
                          <Text style={styles.forgotPasswordText}>
                            Sign up
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <CustomButton
                      label="Log In"
                      style={styles.logInButton}
                      onPress={handleSubmit}
                    />
                  </View>
                )
              }}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default LogIn

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    height: metrics.appHeight,
  },
  logInArea: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: metrics.appHeight * 0.05,
  },
  textArea: {
    marginBottom: metrics.appHeight * 0.05,
  },
  logInText: {
    fontSize: 32,
    fontWeight: "700",
    color: metrics.colorGray,
    marginBottom: 8,
  },
  welcomeText: {
    color: metrics.colorGray,
    fontWeight: "700",
    color: metrics.colorDarkGray,
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
  logInButton: {
    backgroundColor: metrics.colorPrimary,
    marginTop: metrics.appHeight * 0.05,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: metrics.colorDarkGray,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
