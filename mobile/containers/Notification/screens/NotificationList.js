import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { View, Text, StyleSheet, SafeAreaView, RefreshControl, FlatList, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import Header from "../../../components/Header/Header"
import metrics from "../../../assets/constants/metrics"

import { getNotifications } from "../../../services/userService"
import { removeNotification } from "../../../redux/commons/action"
import utcToLocalTime from "../../../utils/utcToLocalTime"

const GuaranteeOrderList = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
    const nav = useNavigation()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const focusSubscription = nav.addListener("focus", () => {
            getData()
        })
        return () => focusSubscription()
    }, [])

    const getData = async () => {
        setIsLoading(true)
        dispatch(removeNotification("NOTIFICATION"))
        try {
            const res = await getNotifications()
            setNotifications(res.data)
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        setIsLoading(false)
    }

    const renderEmpty = () => <View>
        <Text style={styles.noData}>You have no notification.</Text>
    </View>

    return <SafeAreaView>
         <View style={styles.container}>
            <Header title="Notifications" exceptCart/>
            {notifications && <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={getData}
                    />
                }
                data={notifications}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text style={styles.notificationTime}>{utcToLocalTime(item.createdAt, "dd-MM-yyyy HH:mm")}</Text>
                        <Text style={styles.notificationText}>{item.text}</Text>
                    </View>
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
    noData: {
        textAlign: "center"
    },
    notificationItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: metrics.colorZircon,
        borderRadius: 10
    },
    notificationTime: {
        fontWeight: "600",
        fontSize: 12
    },
    notificationText: {
        fontSize: 14
    }
})