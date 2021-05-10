import React from "react"
import { Table, Alert } from "reactstrap"

const ProductList = ({ products, label, field }) => {
    if (!products || !products.length) {
        return <Alert color="primary">No products</Alert>
    }

    return <Table responsive hover bordered striped size="sm">
        <thead>
            <tr>
                <th className="align-top">Name</th>
                <th className="align-top text-center">{label}</th>
            </tr>
        </thead>
        <tbody>
            {products.map(product => <tr key={product._id}>
                <td className="align-middle">{product.name}</td>
                <td className="align-middle text-center">{product[field]}</td>
            </tr>)}
        </tbody>
    </Table>
}

export default ProductList