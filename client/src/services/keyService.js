import api from "./api"
import { BASE_URL } from "../utils/constants"

const KEY_URL = `${BASE_URL}/keys`

export const getFirebaseKey = () => api.get(`${KEY_URL}/firebase`)
