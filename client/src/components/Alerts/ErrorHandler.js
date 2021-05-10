import React, { memo } from "react"

const ErrorHandler = ({ text }) => {
    return <p className="text-danger text-small">{text}</p>
}
export default memo(ErrorHandler)
