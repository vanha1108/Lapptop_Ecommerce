import React, { forwardRef, useRef } from "react"
import { Row, Col, Table, Button } from "reactstrap"
import ReactToPdf from "react-to-pdf"

import CommonModal from "../../../components/Modals/CommonModal"
import utcToLocalTime from "../../../utils/utcToLocalTime"

const OrderDetailModal = (props, ref) => {
    const bill = useRef()
    const { orderDetail, onCancel } = props

    const { _id, createdAt, totalPrice, user, products, isPaid, status } = orderDetail
    const isDone = status === "done"

    return (
        <CommonModal
            header="Order detail"
            ref={ref}
            onCancel={onCancel}
            noFooter
            size="lg"
        >
            <div ref={bill}>
                <Row>
                    <Col md={12} className="mb-2">
                        <p className="font-weight-bold text-big mb-0">COMPANY NAME</p>
                        <span className="font-weight-bold text-small">123 Giai Phong, Hanoi</span> <br/>
                        <span className="font-weight-bold text-small">0123456789</span>
                    </Col>
                    <Col md={12} className="mb-2">
                        <h5 className="text-center">BILL OF SALE</h5>
                    </Col>
                    <Col md={12} className="mb-2">
                        <span className="font-weight-bold">Order ID:</span> {_id}
                    </Col>
                    <Col md={12} className="mb-2">
                        <span className="font-weight-bold">Customer:</span> {user && user.name}
                    </Col>
                    <Col md={12} className="mb-2">
                        <span className="font-weight-bold">Phone number:</span> {user && user.phone}
                    </Col>
                    <Col md={12} className="mb-2">
                        <span className="font-weight-bold">Time:</span> {createdAt && utcToLocalTime(createdAt)}
                    </Col>
                    <Col md={12}>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th className="align-top" width="80px">Product ID</th>
                                    <th className="align-top">Product name</th>
                                    <th className="align-top">Price</th>
                                    <th className="align-top">Guarantee duration</th>
                                    <th className="align-top">Quantity</th>
                                    <th className="align-top">Sub-total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map(product => <tr key={product.product._id}>
                                    <td>{product.product._id}</td>
                                    <td>{product.product.name}</td>
                                    <td>{product.product.price}</td>
                                    <td>{product.product.guaranteeDuration} months</td>
                                    <td>{product.count}</td>
                                    <td>{(product.count * product.product.price).toFixed(2)} USD</td>
                                </tr>)}
                                <tr>
                                    <td colSpan={5} className="font-weight-bold">Total price</td>
                                    <td className="font-weight-bold">{totalPrice} USD</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={12} className="mb-5">
                        <p className="text-right font-weight-bold">Customer signature</p>
                        {isPaid && <p className="text-right font-weight-bold text-success">Paid</p>}
                        {isDone && <p className="text-right"><i>Signed</i></p>}
                    </Col>
                </Row>
            </div>
            {!isDone && <Row>
                <Col md={12} className="mb-2 text-right">
                    <ReactToPdf targetRef={bill} filename={`Bill-${_id}.pdf`} x={10} y={25} scale={0.95}>
                        {({toPdf}) => (
                            <Button color="link" className="font-weight-bold" onClick={toPdf}>Print bill</Button>
                        )}
                    </ReactToPdf>
                </Col>
            </Row>}
        </CommonModal>
    )
}
export default forwardRef(OrderDetailModal)
