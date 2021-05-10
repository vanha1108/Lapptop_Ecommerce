import React, { memo } from "react"
import { Label } from "reactstrap"

const RequiredLabel = ({ text }) => {
    return (
        <Label>
            {text}
            <span className="ml-2 text-danger">*</span>
        </Label>
    )
}
export default memo(RequiredLabel)
