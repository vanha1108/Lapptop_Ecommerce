import React, { useRef } from "react"
import { Row, Col, Table } from "reactstrap"
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa"

import AddButton from "../../../components/Buttons/AddButton"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import SearchBox from "../../../components/Inputs/SearchBox"
import EmptyDataAlert from "../../../components/Alerts/EmptyDataAlert"
import CustomPagination from "../../../components/Pagination/CustomPagination"
import GuaranteeOrderDetail from "../components/GuaranteeOrderDetail"
import StatusSelector from "../components/StatusSelector"
import PaidStatusSelector from "../components/PaidStatusSelector"

import utcToLocalTime from "../../../utils/utcToLocalTime"

import useGuaranteeOrderList from "../hooks/useGuaranteeOrderList"
import useGuaranteeOrderDetail from "../hooks/useGuaranteeOrderDetail"

const GuaranteeOrderList = () => {
  const modal = useRef()
  const {
    guaranteeOrderList,
    total,
    filters,
    changeFilters,
    getData,
    removeData,
  } = useGuaranteeOrderList()

  const {
    id,
    setId,
    createData,
    updateData,
    orderInfo,
    getOrderInfo,
    confirmData,
    changeCreateData,
    changeUpdateData,
    addDetail,
    updateDetail,
    removeDetail
  } = useGuaranteeOrderDetail()

  const openModal = (categoryId) => {
    !!categoryId ? setId(categoryId) : setId(0)
    modal && modal.current && modal.current.toggle()
  }
  const onConfirm = () => {
    confirmData(() => {
      modal && modal.current && modal.current.toggle()
      getData()
    })
  }

  const onRemove = (id) => {
    removeData(id)
  }

  const onCancel = () => setId(0)

  return (
    <div className="animated fadeIn">
      <GuaranteeOrderDetail
        id={id}
        ref={modal}
        header={!!id ? "Edit category" : "Create category"}
        confirmText={!!id ? "Update" : "Create"}
        onCancel={onCancel}
        onConfirm={onConfirm}
        createData={createData}
        updateData={updateData}
        isUpdate={!!id}
        changeCreateData={changeCreateData}
        changeUpdateData={changeUpdateData}
        orderInfo={orderInfo}
        getOrderInfo={getOrderInfo}
        addDetail={addDetail}
        updateDetail={updateDetail}
        removeDetail={removeDetail}
      />
      <Row className="mb-2">
        <Col md={12}>
          <h5>GUARANTEE ORDER LIST</h5>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={4}>
          <AddButton
            text="Create guarantee order"
            onClick={() => openModal()}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={8}>
          <SearchBox
            initValue={filters.search}
            onSearch={(searchString) => changeFilters({ search: searchString })}
          />
        </Col>
        <Col md={2}>
          <StatusSelector 
            isClearable
            placeholder="Select status"
            status={filters.status}
            onChange={e => changeFilters({ status: e ? e.value : null })}
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
      </Row>
      <Row>
        <Col md={12} className="text-right">
          Total of orders: {total}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={12}>
          {guaranteeOrderList && guaranteeOrderList.length > 0 ? (
            <Table bordered hover striped responsive size="sm">
              <thead>
                <tr>
                  <th className="align-top">Customer name</th>
                  <th className="align-top">Customer email</th>
                  <th className="align-top">Customer phone</th>
                  <th className="align-top">Product</th>
                  <th className="align-top">Status</th>
                  <th className="align-top">Total price</th>
                  <th className="align-top">Is paid</th>
                  <th className="align-top">Time</th>
                  <th className="align-top text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {guaranteeOrderList.map((record) => (
                  <tr key={record._id}>
                    <td className="align-middle">{record.user?.name}</td>
                    <td className="align-middle">{record.user?.email}</td>
                    <td className="align-middle">{record.user?.phone}</td>
                    <td className="align-middle">{record.product?.name}</td>
                    <td className="align-middle">{record.status}</td>
                    <td className="align-middle">{record.totalPrice}</td>
                    <td className="align-middle text-center">
                      {record.isPaid ? (
                        <FaCheck size={16} className="text-success" />
                      ) : (
                        <FaTimes size={16} className="text-danger" />
                      )}
                    </td>
                    <td className="align-middle text-center">
                        {utcToLocalTime(record.createdAt, "dd-MM-yyyy")}
                    </td>
                    <td className="text-center">
                      <FaEdit
                        className="cursor-pointer mr-2"
                        onClick={() => openModal(record._id)}
                      />
                      <DeleteButtonIcon onClick={() => onRemove(record._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyDataAlert text="category" />
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

export default GuaranteeOrderList
