import React, { memo } from "react"
import { Button } from "reactstrap"
import { FaPlus } from "react-icons/fa"

const AddButton = ({ text, onClick }) => {
    return (
        <Button
            onClick={onClick}
            color="success"
            className="d-flex align-items-center"
        >
            <FaPlus />
            <span className="ml-2 font-weight-bold">{text}</span>
        </Button>
    )
}

export default memo(AddButton)
