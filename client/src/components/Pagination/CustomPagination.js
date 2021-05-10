import React, { useEffect, useState } from "react"
import Select from "react-select"
import {
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
} from "reactstrap"

import { DEFAULT_LIMIT } from "../../utils/constants"

const limitOptions = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
]

const CustomPagination = ({ filters, changePage, total, changeLimit }) => {
    const [input, setInput] = useState("")
    useEffect(() => {
        setInput(filters.page.toString())
    }, [filters.page])
    return (
        <Row>
            <Col md={12} className="d-flex justify-content-end">
                <Pagination>
                    <div className="mr-1 pagination-dropdown">
                        <Select
                            className="text-center"
                            value={
                                !!filters && !!filters.limit
                                    ? {
                                          label: filters.limit,
                                          value: filters.limit,
                                      }
                                    : DEFAULT_LIMIT
                            }
                            options={limitOptions}
                            onChange={(e) => changeLimit(e.value)}
                        />
                    </div>
                    <PaginationItem className="mr-1">
                        <PaginationLink
                            previous
                            tag="button"
                            className="h-100"
                            disabled={filters.page <= 1}
                            onClick={() => changePage(filters.page - 1)}
                        >
                            Prev
                        </PaginationLink>
                    </PaginationItem>
                    <input
                        type="text"
                        id="pageNumberInput"
                        className="page-input text-center pagination-input"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                changePage(parseInt(input))
                            }
                        }}
                        value={input}
                    />
                    <PaginationItem className="ml-1">
                        <PaginationLink
                            next
                            tag="button"
                            className="h-100"
                            disabled={filters.page > total / filters.limit}
                            onClick={() => changePage(filters.page + 1)}
                        >
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </Col>
        </Row>
    )
}
export default CustomPagination
