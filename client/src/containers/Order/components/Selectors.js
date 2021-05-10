import React from "react"
import Select from "react-select"

const year = new Date().getFullYear()

const yearOptions = [
    { label: year - 1, value: year - 1 },
    { label: year, value: year },
    { label: year + 1, value: year + 1 }
]

const monthOptions = Array.from({ length: 12 }, (item, index) => ({ label: index + 1, value: index + 1 }))

export const YearSelector = (props) => {
    const { year } = props

    const initValue = !!year
        ? yearOptions.find((option) => option.value === year) || null
        : null

    return <Select options={yearOptions} value={initValue} {...props} />
}

export const MonthSelector = (props) => {
    const { month } = props

    const initValue = !!month
        ? monthOptions.find((option) => option.value === month) || null
        : null

    return <Select options={monthOptions} value={initValue} {...props} />
}
