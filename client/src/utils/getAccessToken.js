import { ACCESS_TOKEN } from "./constants"

const getAccessToken = () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) return ""
    return token
}

export default getAccessToken
