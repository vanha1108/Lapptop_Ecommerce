import React from "react"
import { Feather } from '@expo/vector-icons'
import { Text, Image, View, Platform, TouchableOpacity, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker"

import metrics from "../../assets/constants/metrics"
import images from "../../assets/constants/images"

const ImagePreview = ({ imageUrl, onRemoveImage, image, setImage, title }) => {
    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
            if (status !== "granted") {
                alert(t("deny_access_image"))
                return
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    const url = imageUrl
        ? { uri: imageUrl}
        : images.default

    return <View style={styles.container}>
        <Image
            source={image
                ? { uri: image }
                : url}
            style={{ width: 200, height: 200 }}
        />

        <View style={styles.btnContainer}>
            <TouchableOpacity
                style={{ ...styles.btn, ...styles.btnPickImage }}
                onPress={pickImage}
            >
                <Text style={styles.btnText}>{title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ ...styles.btn, ...styles.btnRemove }}
                onPress={() => {
                    onRemoveImage()
                    setImage(null)
                }}
            >
                <Feather name="trash-2" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    </View>
}

export default ImagePreview

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    btnContainer: {
        paddingLeft: 16,
        flexGrow: 1
    },
    btn: {
        paddingVertical: 8,
        width: "100%",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        height: 45
    },
    btnText: {
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: 12
    },
    btnPickImage: {
        marginBottom: 8,
        backgroundColor: metrics.colorGreen
    },
    btnRemove: {
        backgroundColor: metrics.colorRed
    }
})