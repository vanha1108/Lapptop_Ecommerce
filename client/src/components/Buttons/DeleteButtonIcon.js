import React, { memo } from "react"
import { FaTrashAlt } from "react-icons/fa"

const DeleteButtonIcon = ({ onClick }) => {
    return (
        <div
            className="d-inline text-center cursor-pointer hover-opacity"
            title="Delete"
            onClick={onClick}
        >
            <FaTrashAlt />
        </div>
    )
}

export default memo(DeleteButtonIcon)
