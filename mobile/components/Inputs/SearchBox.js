import React, { useEffect, useState } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import metrics from "../../assets/constants/metrics"

const SearchBox = ({ value, onSearch, placeholder }) => {
    const [search, setSearch] = useState("")
    useEffect(() => {
        setSearch(value)
    }, [value])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={search}
                onChangeText={(inputValue) => setSearch(inputValue)}
                placeholder={placeholder || "Search"}
            />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onSearch(search)}
            >
                <AntDesign name="search1" size={20} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBox

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
