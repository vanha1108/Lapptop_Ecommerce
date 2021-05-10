import React from "react"
import { useSelector } from "react-redux"

const Loading = () => {
    const isLoading = useSelector((state) => state.commons.isLoading)

    return isLoading ? (
        <div className="d-flex align-items-center justify-content-center loading">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    ) : null
}

export default Loading
