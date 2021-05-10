import React from "react"
import { Card, CardHeader, CardBody } from "reactstrap"

import ProductList from "./ProductList"

const ProductCard = ({ header, label, field, products }) => {
    return <Card>
        <CardHeader className="font-weight-bold">{header}</CardHeader>
        <CardBody>
            <ProductList 
                products={products}
                label={label}
                field={field}
            />
        </CardBody>
    </Card>
}

export default ProductCard