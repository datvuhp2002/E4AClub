"use client";
import React, { useState, useEffect, Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// import Chart from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChartForAdminDashboard: React.FC<{
  categories: string[];
  series: number[];
  color: string;
}> = ({ series, color, categories }) => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: { sparkline: { enabled: true } },
    tooltip: {
      shared: false,
      style: {
        fontSize: "1.5rem",
      },
      fillSeriesColor: false,
    },
    xaxis: {
      categories: [...categories],
    },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    colors: [`${color}`],
    stroke: {
      width: 3,
      curve: "smooth",
    },
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", margin: "0 auto" }}>
      {isClient ? (
        <Suspense fallback={<Skeleton height={"19rem"} variant="rounded" />}>
          {typeof window !== "undefined" && (
            <Chart
              options={chartOptions}
              series={[{ name: "", data: series }]}
              type="line"
              height={"100%"}
            />
          )}
        </Suspense>
      ) : (
        <Skeleton height={"19rem"} variant="rounded" />
      )}
    </div>
  );
};

export default LineChartForAdminDashboard;
