import format from "date-fns/format"

import { CLIENT_FULL_DATE_FORMAT } from "./constants"

const utcToLocalTime = (time) => {
    try {
        const date = new Date(time).toLocaleString()
        return format(new Date(date), CLIENT_FULL_DATE_FORMAT)
    } catch {
        return ""
    }
}

export default utcToLocalTime