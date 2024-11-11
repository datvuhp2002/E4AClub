"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const BarChartComponent: React.FC<{
  series: { name: string; data: number[] }[];
  categories: string[];
  colors?: string[];
}> = ({ series, categories, colors = ["#3498db", "#e74c3c"] }) => {
  const [chartOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "1.4rem", // Font size for data labels
        colors: ["#3498db", "#e74c3c"], // Color of the data labels
      },
    },

    colors: colors,
    xaxis: {
      categories: categories,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  return (
    <div style={{ width: "100%", height: "100%", margin: "0" }}>
      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={"100%"}
      />
    </div>
  );
};

export default BarChartComponent;
