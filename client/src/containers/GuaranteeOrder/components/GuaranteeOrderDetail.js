import React, { forwardRef, useRef, useState } from "react"
import { Row, Col, Input, Label, Button, Table, CustomInput } from "reactstrap"
import { FaCheck, FaTimes } from "react-icons/fa"
import sumBy from "lodash/sumBy"
import ReactToPdf from "react-to-pdf"

import CommonModal from "../../../components/Modals/CommonModal"
import StatusSelector from "./StatusSelector"
import Detail from "./Detail"
import utcToLocalTime from "../../../utils/utcToLocalTime"

const GuaranteeOrderDetail = (props, ref) => {
    const { 
        id,
        isUpdate, 
        header, 
        confirmText, 
        orderInfo,
        getOrderInfo,
        createData, 
        updateData, 
        changeCreateData,
        changeUpdateData,
        onConfirm, 
        onCancel,
        addDetail,
        updateDetail,
        removeDetail 
    } = props

    const bill = useRef()
    const [isPrint, setIsPrint] = useState(false)

    const render = () => {
        if (isUpdate) {
            return <>
                <div ref={bill}>
                    <Row className="mb-2">
                        <Col md={12} className="mb-2">
                            <p className="font-weight-bold text-big mb-0">COMPANY NAME</p>
                            <span className="font-weight-bold text-small">123 Giai Phong, Hanoi</span> <br/>
                            <span className="font-weight-bold text-small">0123456789</span>
                        </Col>
                        <Col md={12} className="mb-2">
                            <h5 className="text-center">BILL OF GUARANTEE SERVICE</h5>
                        </Col>
                        <Col md={12} className="mb-2">
                            <p className="font-weight-bold">Customer name: {updateData.user?.name}</p>
                            <p className="font-weight-bold">Customer email: {updateData.user?.email}</p>
                            <p className="font-weight-bold">Customer phone: {updateData.user?.phone}</p>
                            <p className="font-weight-bold">Product: {updateData.product?.name}</p>
                            <p className="font-weight-bold">Time: {utcToLocalTime(updateData.createdAt)}</p>
                        </Col>
                        <Col md={12} className="mb-2">
                            {!isPrint 
                                ? <Input 
                                    type="textarea"
                                    rows={4}
                                    value={updateData.note}
                                    onChange={e => changeUpdateData({ note: e.target.value })}
                                    placeholder="Note"
                                />
                                : <p className="font-weight-bold">Note: {updateData.note}</p>}
                        </Col>
                        <Col md={12} className="mb-2">
                            <Label className="font-weight-bold">Detail</Label>
                            {!isPrint 
                                ? <Detail 
                                    detail={updateData.detail}
                                    addDetail={addDetail}
                                    updateDetail={updateDetail}
                                    removeDetail={removeDetail}
                                />
                                : updateData.detail.map(item => <p key={item.guid}>
                                    Content: {item.content} - Price: {item.price}
                                </p>)}
                            {updateData.detail && <p className="font-weight-bold">
                                Total price: {sumBy(updateData.detail, "price")}    
                            </p>}
                        </Col>
                        <Col md={12}>
                            <Row>
                                <Col md={6}>
                                    <Label className="font-weight-bold">Status</Label>
                                    {!isPrint
                                        ? <StatusSelector 
                                            status={updateData.status}
                                            onChange={e => changeUpdateData({ status: e.value })}
                                        />
                                        : <p className="font-weight-bold">{updateData.status}</p>}
                                </Col>
                                <Col md={6}>
                                    {!isPrint
                                        ? <CustomInput 
                                            id="is-paid-checkbox"
                                            type="checkbox"
                                            label="Is paid"
                                            checked={updateData.isPaid}
                                            onChange={e => changeUpdateData({ isPaid: e.target.checked })}
                                        />
                                        : <p className="font-weight-bold">
                                            Is paid{" "}
                                            {updateData.isPaid
                                                ? <FaCheck size={16} className="text-success" />
                                                : <FaTimes size={16} className="text-danger" />}
                                        </p>}
                                </Col>
                            </Row>
                        </Col>
                        {isPrint && <Col md={12} className="mb-5">
                            <p className="text-right font-weight-bold">Customer signature</p>
                        </Col>}
                    </Row>
                </div>
                <Row>
                    <Col md={12} className="mb-2 text-right">
                        <ReactToPdf targetRef={bill} filename={`GuaranteeBill-${id}.pdf`} x={40} y={25} scale={1.1}>
                            {({toPdf}) => (
                                <Button color="link" className="font-weight-bold" onClick={() => {
                                    setIsPrint(true)
                                    setTimeout(() => {
                                        toPdf()
                                        setIsPrint(false)
                                    }, 200)
                                }}>Print bill</Button>
                            )}
                        </ReactToPdf>
                    </Col>
                </Row>
            </>
        }

        return <>
            <Row className="mb-2">
                <Col md={4}>
                    <Label>Order ID</Label>
                    <Input 
                        value={createData.orderId}
                        onChange={e => changeCreateData({ orderId: e.target.value })}
                        placeholder="Order ID"
                    />
                </Col>
                <Col md={4}>
                    <Label>Product ID</Label>
                    <Input 
                        value={createData.productId}
                        onChange={e => changeCreateData({ productId: e.target.value })}
                        placeholder="Product ID"
                    />
                </Col>
                <Col md={4} className="d-flex align-items-end">
                    <Button color="primary" onClick={getOrderInfo}>Check data</Button>
                </Col>
            </Row>
            {orderInfo && <Row>
                <Col md={12} className="mb-2">
                    <h5>Order history</h5>
                    <Table responsive hover striped bordered size="sm">
                        <tbody>
                            <tr>
                                <td className="font-weight-bold">Time</td>
                                <td>{orderInfo.createdAt && utcToLocalTime(orderInfo.createdAt)}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Customer name</td>
                                <td>{orderInfo.user?.name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Customer email</td>
                                <td>{orderInfo.user?.email}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Customer phone</td>
                                <td>{orderInfo.user?.phone}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Product</td>
                                <td>{orderInfo.product?.name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Guarantee service on</td>
                                <td>
                                    {orderInfo.guaranteeServiceOn 
                                        ? <FaCheck size={16} className="text-success" />
                                        : <FaTimes size={16} className="text-danger" />}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={12} className="mb-2">
                    <Input 
                        type="textarea"
                        placeholder="Note"
                        rows={4}
                        value={createData.note}
                        onChange={e => changeCreateData({ note: e.target.value })}
                    />
                </Col>
                <Col md={12}>
                    <Button color="success" block onClick={onConfirm}>Create guarantee order</Button>
                </Col>
            </Row>}
        </>
    }

    return (
        <CommonModal
            header={header}
            confirmText={confirmText}
            onConfirm={onConfirm}
            ref={ref}
            onCancel={onCancel}
        >
            {render()}
        </CommonModal>
    )
}
export default forwardRef(GuaranteeOrderDetail)
