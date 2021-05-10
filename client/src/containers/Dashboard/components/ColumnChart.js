import React from "react"
import Chart from "react-apexcharts"

const themeColors = [
    "#26a0fc",
    "#26e7a6",
    "#febc3b",
    "#ff6178",
    "#8b75d7",
    "#6d848e",
    "#46b3a9",
    "#d830eb"
]

const ColumnChart = ({ data, categories }) => {
    const configs = {
        series: [
          {
            data
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
          },
          colors: themeColors,
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories,
            labels: {
              style: {
                colors: themeColors,
                fontSize: "12px",
              },
            },
          },
        },
      }

    return <Chart
        options={configs.options}
        series={configs.series}
        type="bar"
        height={350}
    />
}

export default ColumnChart
