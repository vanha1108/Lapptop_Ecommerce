import React from "react"
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native"

import metrics from "../../../assets/constants/metrics"

import Header from "../../../components/Header/Header"

import useChat from "../hooks/useChat"

const Chat = () => {
    const { messages, text, setText, sendMessage, userGetMessages, isLoading, conversation, page, messageListRef, canLoadMore, loadMore, keyboardHeight } = useChat()

    const renderHeader = () => {
        if (!canLoadMore) return null
        return <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
            <Text style={styles.loadMoreText}>Load more</Text>    
        </TouchableOpacity>
    }

    return (
        <SafeAreaView>
            <View style={{...styles.container, height: keyboardHeight ? (metrics.appHeight - 50 - keyboardHeight) : metrics.screenHeight}}>
                <Header title="Chat" />
                <KeyboardAvoidingView
                        enableOnAndroid
                        keyboardDismissMode="interactive"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.scrollView}
                    >
                    <FlatList
                        keyboardDismissMode="none"
                        ref={messageListRef}
                        extraScrollHeight={metrics.appHeight * 0.35}
                        enableOnAndroid
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={() => userGetMessages(conversation, page)}
                            />
                        }
                        ListHeaderComponent={renderHeader}
                        style={styles.messageList}
                        data={messages}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    styles.messageItemContainer,
                                    item.isCustomerMessage &&
                                        styles.messageCustomer,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.messageItem,
                                        item.isCustomerMessage 
                                            ? styles.messageItemCustomer
                                            : styles.messageItemSystem,
                                    ]}
                                >
                                    {item.isCustomerMessage
                                        ? item.text
                                        : item.text.slice(0, -1)}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => `${index}`}
                    />
                        <View style={styles.messageBoxContainer}>
                            <TextInput
                                placeholder="Type something..."
                                value={text}
                                onChangeText={(value) => setText(value)}
                                style={styles.messageBox}
                            />
                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={sendMessage}
                            >
                                <Text style={styles.sendText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    messageList: {
        height: "80%",
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "flex-end"
    },
    messageBoxContainer: {
        margin: 8,
        flexDirection: "row",
    },
    messageBox: {
        flexGrow: 1,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: metrics.colorLightGray,
        marginRight: 8,
        paddingHorizontal: 8
    },
    sendButton: {
        backgroundColor: metrics.colorPrimary,
        padding: 8,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
    },
    sendText: {
        color: metrics.colorWhite,
    },
    messageItemContainer: {
        flexDirection: "row",
    },
    messageCustomer: {
        justifyContent: "flex-end",
    },
    messageItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: metrics.colorLightGray,
        marginBottom: 8,
        justifyContent: "center",
    },
    messageItemCustomer: {
        backgroundColor: metrics.colorPrimaryDisabled,
        color: metrics.colorWhite,
    },
    messageItemSystem: {
        color: metrics.colorEbonyClay
    },
    loadMoreButton: {
        alignItems: "center"
    },
    loadMoreText: {
        color: metrics.colorPrimaryDisabled,
        fontSize: 14
    }
})

export default Chat
