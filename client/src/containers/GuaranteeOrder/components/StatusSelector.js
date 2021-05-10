import React from "react"
import Select from "react-select"

const options = [
    { label: "Received", value: "Received" },
    { label: "Fixing", value: "Fixing" },
    { label: "Returned to customer", value: "Returned to customer" }
]

const StatusSelector = (props) => {
    const { status } = props

    const initValue = !!status
        ? options.find((option) => option.value === status) || null
        : null

    return <Select options={options} value={initValue} {...props} />
}

export default StatusSelector
