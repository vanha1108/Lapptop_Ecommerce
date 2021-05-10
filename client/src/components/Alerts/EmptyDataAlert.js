import React, { memo } from "react"
import { Alert } from "reactstrap"

const EmptyDataAlert = ({ label, className, style }) => {
    return (
        <Alert color="primary" className={className} style={style}>
            No {label} to display
        </Alert>
    )
}

EmptyDataAlert.defaultProps = {
    className: "",
    style: {},
}

export default memo(EmptyDataAlert)
