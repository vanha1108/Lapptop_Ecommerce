import React from "react"
import { Row, Col, Alert, Button, Input } from "reactstrap"

import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"

const Detail = ({ detail, addDetail, updateDetail, removeDetail }) => {
    return <Row>
        <Col md={12} className="mb-2">
            <Button color="success" size="sm" onClick={addDetail}>Add detail</Button>
        </Col>
        <Col md={12}>
            {detail && !!detail.length
                ? detail.map(item => <Row key={item.guid} className="mb-2">
                    <Col md={5}>
                        <Input 
                            value={item.content}
                            onChange={e => updateDetail(item.guid, { content: e.target.value })}
                            placeholder="Content"
                        />
                    </Col>
                    <Col md={5}>
                        <Input 
                            type="number"
                            value={item.price || ""} 
                            onChange={e => updateDetail(item.guid, { price: parseInt(e.target.value) })}
                            placeholder="Price"
                        />
                    </Col>
                    <Col md={2}>
                        <DeleteButtonIcon onClick={() => removeDetail(item.guid)}/>
                    </Col>
                </Row>)
                : <Alert color="primary">No detail</Alert>}
        </Col>
    </Row>
}

export default Detail