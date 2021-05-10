import React, { useCallback, useRef } from "react"
import { Row, Col, Table, CustomInput, Label } from "reactstrap"
import { AiFillEye } from "react-icons/ai"
import { FaCheck, FaTimes } from "react-icons/fa"

import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import EmptyDataAlert from "../../../components/Alerts/EmptyDataAlert"
import SearchBox from "../../../components/Inputs/SearchBox"
import CustomPagination from "../../../components/Pagination/CustomPagination"
import OrderDetailModal from "../components/OrderDetailModal"
import { YearSelector, MonthSelector } from "../components/Selectors"
import PaidStatusSelector from "../components/PaidStatusSelector"
import DoneStatusSelector from "../components/DoneStatusSelector"

import useOrderList from "../hooks/useOrderList"
import useOrderDetail from "../hooks/useOrderDetail"

import utcToLocalTime from "../../../utils/utcToLocalTime"

const OrderList = () => {
    const modal = useRef()
    const {
        orderList,
        total,
        filters,
        month, 
        year,
        setMonth,
        setYear,
        changeFilters,
        removeData,
        updateData
    } = useOrderList()

    const { setId, orderDetail } = useOrderDetail()

    const onRemove = (id) => {
        removeData(id)
    }

    const openModal = (orderId) => {
        !!orderId ? setId(orderId) : setId(0)
        modal && modal.current && modal.current.toggle()
    }

    const onCancel = () => setId(0)

    const renderProducts = useCallback(products => {
        if (!products || !products.length) return ""
        const strings = products.map(item => `${item.product?.name} x ${item.count}`).join(", ")
        return strings
    }, [])

    return (
        <div className="animated fadeIn">
            <OrderDetailModal 
                orderDetail={orderDetail}
                onCancel={onCancel}
                ref={modal}
            />
            <Row className="mb-2">
                <Col md={12}>
                    <h5>ORDER LIST</h5>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={6}>
                    <SearchBox 
                        initValue={filters.search}
                        onSearch={(searchString) =>
                            changeFilters({ search: searchString })
                        }
                    />
                </Col>
                <Col md={2}>
                    <PaidStatusSelector 
                        isPaid={filters.isPaid}
                        onChange={e => changeFilters({ isPaid: e ? e.value : null })}
                        isClearable
                        placeholder="Paid status"
                    />
                </Col>
                <Col md={2}>
                    <DoneStatusSelector 
                        isDone={filters.isDone}
                        onChange={e => changeFilters({ isDone: e ? e.value : null })}
                        isClearable
                        placeholder="Done status"
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={3}>
                    <Label>Year</Label>
                    <YearSelector 
                        year={year}
                        onChange={e => setYear(e.value)}
                    />
                </Col>
                <Col md={3}>
                    <Label>Month</Label>
                    <MonthSelector 
                        month={month}
                        onChange={e => setMonth(e.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="text-right">
                    Total of orders: {total}
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    {orderList && orderList.length > 0 ? (
                        <Table bordered hover striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Customer name</th>
                                    <th>Phone number</th>
                                    <th>Products</th>
                                    <th>Time</th>
                                    <th className="text-center">Is done</th>
                                    <th className="text-center">Is paid</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((record) => (
                                    <tr key={record._id}>
                                        <td>{record.user?.name}</td>
                                        <td>{record.user?.phone}</td>
                                        <td>{renderProducts(record.products)}</td>
                                        <td>{utcToLocalTime(record.createdAt)}</td>
                                        <td className="text-center">
                                            <CustomInput 
                                                type="checkbox"
                                                id={`status_checkbox_${record._id}`}
                                                checked={record.status === "done"}
                                                onChange={() => updateData(record._id, record.status)}
                                            />
                                        </td>
                                        <td className="text-center">
                                            {record.isPaid 
                                                ? <FaCheck size={16} className="text-success" />
                                                : <FaTimes size={16} className="text-danger" />}
                                        </td>
                                        <td className="text-center">
                                            <AiFillEye 
                                                className="cursor-pointer mr-2"
                                                title="View"
                                                size={16}
                                                onClick={() => openModal(record._id)}
                                            />
                                            <DeleteButtonIcon
                                                onClick={() =>
                                                    onRemove(record._id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <EmptyDataAlert text="order" />
                    )}
                </Col>
                <Col md={12}>
                    <CustomPagination
                        total={total}
                        filters={filters}
                        changeLimit={(limit) => changeFilters({ limit })}
                        changePage={(page) => changeFilters({ page })}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default OrderList
