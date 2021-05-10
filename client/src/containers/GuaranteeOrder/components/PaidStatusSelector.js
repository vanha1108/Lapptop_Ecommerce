import React from "react"
import Select from "react-select"

const options = [
    { label: "Paid", value: true },
    { label: "Not paid", value: false }
]

const PaidStatusSelector = (props) => {
    const { isPaid } = props

    const initValue = options.find((option) => option.value === isPaid) || null

    return <Select options={options} value={initValue} {...props} />
}

export default PaidStatusSelector
