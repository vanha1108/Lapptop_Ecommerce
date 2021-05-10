import React from "react"
import Chart from "react-apexcharts"

const PieChart = ({ series, labels }) => {
    const configs = {
        series,
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          legend: {
            position: "bottom",
          },
          labels,
          responsive: [
            {
              breakpoint: 768,
              options: {
                chart: {
                  width: 440,
                },
              },
            },
          ],
        },
    }
    return (
        <Chart
        options={configs.options}
        series={configs.series}
        type="pie"
        height={350}
    />
  )
}

export default PieChart
