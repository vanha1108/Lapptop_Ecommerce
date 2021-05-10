import React from "react"
import Select from "react-select"

const options = [
    { label: "Admin", value: "Admin" },
    { label: "Guest", value: "Guest" },
    { label: "Technician", value: "Technician" },
    { label: "Seller", value: "Seller" }
]

const RoleSelector = (props) => {
    const { role } = props

    const initValue = !!role
        ? options.find((option) => option.value === role) || null
        : null

    return <Select options={options} value={initValue} {...props} />
}

export default RoleSelector
