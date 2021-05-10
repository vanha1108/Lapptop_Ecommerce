import React, { memo, useState, useEffect, useCallback } from "react"
import { Input } from "reactstrap"

const SearchBox = ({ initValue, onSearch, placeholder, className, style }) => {
    const [searchString, setSearchString] = useState(initValue)
    useEffect(() => {
        setSearchString(initValue)
    }, [initValue])
    const onKeyUp = useCallback(
        (e) => {
            e.key === "Enter" && onSearch(searchString)
        },
        [searchString, onSearch],
    )
    return (
        <Input
            placeholder={placeholder}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyUp={onKeyUp}
            className={className}
            style={style}
        />
    )
}

SearchBox.defaultProps = {
    placeholder: "Type something to search",
    className: "",
    style: {},
}

export default memo(SearchBox)
