import React from "react"
import Select from "react-select"

const options = [
    { label: "Done", value: true },
    { label: "Waiting", value: false }
]

const DoneStatusSelector = (props) => {
    const { isDone } = props

    const initValue = options.find((option) => option.value === isDone) || null

    return <Select options={options} value={initValue} {...props} />
}

export default DoneStatusSelector
