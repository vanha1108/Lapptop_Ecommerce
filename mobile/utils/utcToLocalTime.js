import format from "date-fns/format"

const utcToLocalTime = (time, DATE_FORMAT) => {
    try {
        const date = new Date(time).toLocaleString()
        return format(new Date(date), DATE_FORMAT)
    } catch {
        return ""
    }
}

export default utcToLocalTime