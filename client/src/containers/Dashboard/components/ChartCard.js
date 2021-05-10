import React, { useState } from "react"
import { Card, CardHeader, CardBody } from "reactstrap"
import { FaChartPie, FaChartBar } from "react-icons/fa"

import ColumnChart from "./ColumnChart"
import PieChart from "./PieChart"

const ICON_SIZE = 20
const GRAY = "#888"
const ACTIVE = "#ff6347"

const ChartCard = ({ header, pieSeries, pieLabels, columnData, columnCategories }) => {
    const [useColumnChart, setUseColumnChart] = useState(true)

    return <Card>
        <CardHeader className="font-weight-bold">{header}</CardHeader>
        <CardBody>
            {useColumnChart
                ? <ColumnChart 
                    data={columnData}
                    categories={columnCategories}
                />
                : <PieChart 
                    series={pieSeries}
                    labels={pieLabels}
                />}
            <div className="d-flex align-items-center justify-content-end">
                <FaChartPie 
                    size={ICON_SIZE} 
                    className="cursor-pointer mr-3 hover-opacity" 
                    color={!useColumnChart ? ACTIVE: GRAY}
                    onClick={() => setUseColumnChart(false)}
                    title="Pie chart"
                />
                <FaChartBar 
                    size={ICON_SIZE} 
                    className="cursor-pointer hover-opacity" 
                    color={useColumnChart ? ACTIVE: GRAY} 
                    onClick={() => setUseColumnChart(true)}
                    title="Column chart"
                />
            </div>
        </CardBody>
    </Card>
}

export default ChartCard