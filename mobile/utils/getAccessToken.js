import AsyncStorage from "@react-native-async-storage/async-storage"

import { ACCESS_TOKEN } from "../utils/constants"

const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)
    return accessToken
}

export default getAccessToken