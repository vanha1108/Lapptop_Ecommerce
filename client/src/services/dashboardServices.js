import api from "./api"
import { BASE_URL } from "../utils/constants"

const DASHBOARD_URL = `${BASE_URL}/dashboard`

export const get = ({ startTime, endTime }) => api.get(`${DASHBOARD_URL}`, { params: { startTime, endTime }})
