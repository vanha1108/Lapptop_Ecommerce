export const BASE_URL =
    process.env.REACT_APP_ENVIRONMENT === "production"
        ? "https://laptop-ecommerce.herokuapp.com/api/v1"
        : "http://localhost:5000/api/v1"

export const ACCESS_TOKEN = "ACCESS_TOKEN"

export const DEFAULT_LIMIT = 30

export const CLIENT_DATE_FORMAT = "dd-MM-yyyy"

export const CLIENT_FULL_DATE_FORMAT = "dd-MM-yyyy HH:mm"

export const PUSHER_APP_KEY = "882aff6c083e5c88aca0"
export const PUSHER_APP_CLUSTER = "ap1"
