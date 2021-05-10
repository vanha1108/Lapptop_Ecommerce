import React from "react"
import { Row, Col } from "reactstrap"

import ProductCard from "../components/ProductCard"
import ChartCard from "../components/ChartCard"

import useDashboard from "../hooks/useDashboard"

console.log(window)

const Dashboard = () => {
    const { data } = useDashboard()
    const {
        topSale,
        topView,
        topGuarantee,
        categoryInformation,
        totalSale,
        totalRevenue,
        totalCategories,
        totalGuaranteeOrders,
        totalOrders,
        totalProducts,
        totalUsers
    } = data

    const saleData = categoryInformation ? categoryInformation.map(item => item.sale) : []
    const categoryNameData = categoryInformation ? categoryInformation.map(item => item.name) : []
    const revenueData = categoryInformation ? categoryInformation.map(item => item.revenue) : []

    return <div className="animated fadeIn">
        <Row className="mb-4 border-bottom">
            <Col md={12} className="d-flex justify-content-between">
                <p className="font-weight-bold">Total users: {totalUsers}</p>
                <p className="font-weight-bold">Total products: {totalProducts}</p>
                <p className="font-weight-bold">Total orders: {totalOrders}</p>
                <p className="font-weight-bold">Total guarantee orders: {totalGuaranteeOrders}</p>
                <p className="font-weight-bold">Total categories: {totalCategories}</p>
            </Col>
        </Row>
        <Row className="mb-2">
            <Col md={4}>
                <ProductCard 
                    header="Top sale products"
                    products={topSale}
                    label="Sale quantity"
                    field="soldQuantity"
                />
            </Col>
            <Col md={4}>
                <ProductCard 
                    header="Top view products"
                    products={topView}
                    label="View times"
                    field="viewCount"
                />
            </Col>
            <Col md={4}>
                <ProductCard 
                    header="Top guarantee products"
                    products={topGuarantee}
                    label="Guarantee times"
                    field="guaranteeCount"
                />
            </Col>
        </Row>
        <Row className="mb-2">
            <Col md={6}>
                <ChartCard 
                    header={`Sales (last 30 days). Total: ${totalSale}`} 
                    pieSeries={saleData}
                    pieLabels={categoryNameData}
                    columnData={saleData}
                    columnCategories={categoryNameData}
                />
            </Col>
            <Col md={6}>
                <ChartCard 
                    header={`Revenue (last 30 days). Total: ${totalRevenue}`} 
                    pieSeries={revenueData}
                    pieLabels={categoryNameData}
                    columnData={revenueData}
                    columnCategories={categoryNameData}
                />
            </Col>
        </Row>
    </div>
}

export default Dashboard
