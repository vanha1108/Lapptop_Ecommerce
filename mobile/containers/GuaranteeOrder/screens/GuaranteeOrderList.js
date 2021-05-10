import React from "react"
import { View, Text, StyleSheet, SafeAreaView, RefreshControl, FlatList, TouchableOpacity, Touchable } from "react-native"

import OrderItem from "../components/OrderItem"
import SearchBox from "../../../components/Inputs/SearchBox"
import Header from "../../../components/Header/Header"
import metrics from "../../../assets/constants/metrics"

import useGuaranteeOrderList from "../hooks/useGuaranteeOrderList"

const GuaranteeOrderList = () => {
    const { orders, isLoading, getData, filters, changeFilters, goToDetail, onRemove } = useGuaranteeOrderList()

    const renderEmpty = () => <View>
        <Text style={styles.noData}>You have no notification.</Text>
    </View>

    return <SafeAreaView>
         <View style={styles.container}>
            <Header title="My guarantee orders" />
            <View style={styles.searchBox}>
                <SearchBox 
                    placeholder="Search"
                    value={filters.search}
                    onSearch={searchString => changeFilters({ search: searchString })}
                />
                <View style={styles.createBtnArea}>
                    <TouchableOpacity style={styles.createBtn} onPress={() => goToDetail()}>
                        <Text style={styles.createText}>Create new</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {orders && <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={getData}
                    />
                }
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <OrderItem
                        order={item}
                        onPress={() => goToDetail(item)}
                        onRemove={() => onRemove(item._id)}
                    />
                )}
                ListEmptyComponent={renderEmpty}
            />}
        </View>
    </SafeAreaView>
}

export default GuaranteeOrderList

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.appHeight,
        backgroundColor: metrics.colorWhite,
    },
    searchBox: {
        padding: 8
    },
    noData: {
        textAlign: "center"
    },
    createBtnArea: {
        flexDirection: "row"
    },
    createBtn: {
        marginTop: 8,
        backgroundColor: metrics.colorPrimaryDisabled,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4
    },
    createText: {
        color: metrics.colorWhite
    }
})