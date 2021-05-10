import React, { memo } from "react"
import { Button } from "reactstrap"

const LinkEditButton = ({ label, onClick }) => {
    return (
        <Button color="link" onClick={onClick}>
            {label}
        </Button>
    )
}

export default memo(LinkEditButton)
