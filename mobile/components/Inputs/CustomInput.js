import React, { useState } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import metrics from "../../assets/constants/metrics"

const CustomInput = (props) => {
    const {
        value,
        onChangeText,
        icon,
        placeholder,
        isInvalid,
        isPassword,
        ...rest
    } = props
    const [show, setShow] = useState(false)

    const errorStyle = isInvalid ? styles.error : {}

    return (
        <View style={{ ...styles.container, ...errorStyle }}>
            {icon && (
                <AntDesign
                    name={icon}
                    size={20}
                    color={metrics.colorIconGray}
                />
            )}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={isPassword && !show}
                {...rest}
            />
            {isPassword && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShow(!show)}
                >
                    <Ionicons
                        name={show ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: metrics.colorLightGray,
        height: 40,
    },
    input: {
        color: metrics.colorDarkGray,
        marginLeft: 8,
        flexGrow: 1,
        fontWeight: "700",
    },
    error: {
        borderColor: metrics.colorRed,
    },
})
