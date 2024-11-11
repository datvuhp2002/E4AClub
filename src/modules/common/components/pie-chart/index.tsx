"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { IPieChartByMonthData } from "@/common/models";

const PieChartComponent: React.FC<{
  data: IPieChartByMonthData;
  colors?: string[];
}> = ({ data }) => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      type: "pie",
      height: "100%",
    },
    labels: data.labels,
    tooltip: {
      theme: "light",
      custom: function ({ series, seriesIndex, w }) {
        return `
          <div style="background-color: #fff; padding: 10px; border-radius: 5px;">
            <strong>${w.config.labels[seriesIndex]}</strong>: ${series[seriesIndex]}
          </div>
        `;
      },
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        colors: ["#fff"],
      },
    },
  });
  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      labels: data.labels,
    }));
  }, [data.labels]);
  return (
    <div style={{ width: "100%", height: "100%", margin: "0 auto" }}>
      <Chart
        options={chartOptions}
        series={data.series}
        type="pie"
        height="100%"
      />
    </div>
  );
};

export default PieChartComponent;
