import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native"
import { useRoute } from "@react-navigation/native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Formik } from "formik"
import * as yup from "yup"

import metrics from "../../../assets/constants/metrics"
import utcToLocalTime from "../../../utils/utcToLocalTime"

import Header from "../../../components/Header/Header"
import CustomInput from "../../../components/Inputs/CustomInput"
import CustomButton from "../../../components/Buttons/CustomButton"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"
import DatePicker from "../../../components/Date/DatePicker"
import ImagePreview from "../../../components/Images/ImagePreview"

import useGuaranteeOrderDetail from "../hooks/useGuaranteeOrderDetail"

const fields = [
  {
    field: "productName",
    label: "Product name",
    icon: "user",
  },
  {
    field: "storeAddress",
    label: "Store address",
    icon: "phone",
  },
  {
    field: "storePhone",
    label: "Store phone",
    icon: "phone",
  },
  {
    field: "guaranteeDuration",
    label: "Guarantee duration",
    icon: "home",
    keyboardType: "numeric",
    parseFunction: (value) => parseInt(value) || 0,
  },
]

const GuaranteeOrderDetail = () => {
  const {
    params: { order },
  } = useRoute()

  const {
    confirmData,
    defaultData,
    showDatePicker,
    setShowDatePicker,
    image,
    setImage
  } = useGuaranteeOrderDetail()

  const schema = yup.object({
    productName: yup.string().required("Product is required"),
    guaranteeDuration: yup
      .number()
      .required("Guarantee duration is required")
      .test(
        "test guarantee duration",
        "Guarantee duration must be positive",
        (value) => value > 0
      ),
    startDate: yup
      .number()
      .required("Start date is required")
      .test("test start date", "Start date invalid", (value) => value > 0),
  })

  const isIOS = Platform.OS === "ios"

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title="Detail" exceptCart />
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          enableOnAndroid
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            validationSchema={schema}
            initialValues={order || defaultData}
            enableReinitialize
            onSubmit={(values) => {
              confirmData(values)
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

              const renderStartDate = () => {
                if (isIOS) {
                  return (
                    <>
                      {!values.startDate && (
                        <TouchableOpacity
                          onPress={() => setShowDatePicker(true)}
                        >
                          <Text style={styles.startDate}>Add start date</Text>
                        </TouchableOpacity>
                      )}

                      {(values.startDate || showDatePicker) && (
                        <DatePicker
                          date={
                            values.startDate
                              ? new Date(values.startDate)
                              : new Date()
                          }
                          onChange={(e, selectedDate) =>
                            setFieldValue(
                              "startDate",
                              new Date(selectedDate).getTime()
                            )
                          }
                        />
                      )}
                    </>
                  )
                }

                return (
                  <>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <Text style={styles.startDate}>
                        {values.startDate
                          ? utcToLocalTime(values.startDate, "dd-MM-yyyy")
                          : "Add start date"}
                      </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                      <DatePicker
                        date={
                          values.startDate
                            ? new Date(values.startDate)
                            : new Date()
                        }
                        onChange={(e, selectedDate) => {
                          setShowDatePicker(false)
                          if (selectedDate) {
                            setFieldValue(
                              "startDate",
                              new Date(selectedDate).getTime()
                            )
                          }
                        }}
                      />
                    )}
                  </>
                )
              }

              return (
                <View style={styles.contentArea}>
                  <View style={styles.fieldArea}>
                    {fields.map((input) => (
                      <View key={input.field} style={styles.inputField}>
                        <Text style={styles.inputLabel}>{input.label}</Text>
                        <CustomInput
                          placeholder={input.label}
                          icon={input.icon}
                          value={values[input.field]?.toString() || ""}
                          name={input.field}
                          isInvalid={
                            touched[input.field] && errors[input.field]
                          }
                          onChangeText={(value) =>
                            setFieldValue(
                              input.field,
                              input.parseFunction
                                ? input.parseFunction(value)
                                : value
                            )
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
                    <View>
                      <Text style={styles.inputLabel}>Start date</Text>
                      {renderStartDate()}
                      {touched.startDate && errors.startDate && (
                        <ErrorHandler text={errors.startDate} />
                      )}
                    </View>
                    <View>
                        <ImagePreview 
                            image={image}
                            setImage={setImage}
                            title="Update image"
                            imageUrl={values.imageUrl}
                            onRemoveImage={() => console.log("remove")}
                        />
                    </View>
                  </View>

                  <CustomButton
                    label="Confirm"
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
  startDate: {
    color: metrics.primarColorBlue,
    textDecorationLine: "underline",
    marginBottom: 8,
  },
})

export default GuaranteeOrderDetail
