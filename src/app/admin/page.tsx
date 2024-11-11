"use client";
import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import StatisticsCard from "@/modules/common/components/statistics-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCommentDots,
  faGear,
  faMoneyBillWave,
  faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Card from "@/modules/common/components/Card";
import ReaderPublishSearchServices from "@/services/reader-publish-search-services";
import formatNumber from "@/common/format_number";
import Select from "@/modules/common/components/Select";
import CustomSkeleton from "@/modules/common/components/custom-skeleton";
import { DataEntry, IDataItem, IPieChartByMonthData } from "@/common/models";

const PieChartComponent = dynamic(
  () => import("@/modules/common/components/pie-chart"),
  { ssr: false }
);
const BarChartComponent = dynamic(
  () => import("@/modules/common/components/bar-chart"),
  { ssr: false }
);

const fieldMapping: Record<string, string> = {
  thuvien: "Thẻ thông thường",
  thieunhi: "Thẻ thiếu nhi",
  thieunhigiamho: "Thẻ thiếu nhi giám hộ",
  canbohuutri: "Thẻ cán bộ hưu trí",
  doanhnhan: "Thẻ doanh nhân",
};

export default function Page() {
  // const [countSuccessStatistic, setCountSuccessStatistic] =
  //   useState<IStatisticsCardData>({ categories: [], series: [] });
  // const [countRefuseStatistic, setCountRefuseStatistic] =
  //   useState<IStatisticsCardData>({ categories: [], series: [] });
  // const [countTotalPriceStatistic, setCountTotalPriceStatistic] =
  //   useState<IStatisticsCardData>({ categories: [], series: [] });
  // const [countFeedbackStatistic, setCountFeedbackStatistic] =
  //   useState<IStatisticsCardData>({ categories: [], series: [] });
  const [cardValues, setCardValue] = useState<IDataItem>();
  const [selectedMonth, setSelectedMonth] = useState<String>();
  const [pieChartData, setPieChartData] = useState<any>();
  const [pieChartByMonthData, setPieChartByMonthData] =
    useState<IPieChartByMonthData>({ labels: [], series: [] });
  const [barChartData, setBarChartData] = useState<any>();

  // const formatChartData = (data: any[], column_name: string) => {
  //   const categories = data.map((item) =>
  //     formatDateTime.formatDate(item.month)
  //   );
  //   const series = data.map((item) => Number(item[`${column_name}`]));
  //   return { categories, series };
  // };

  const transformChartData = (data: any[]) => {
    const categories = data.map((item) => item.month);
    const maleSeries = data.map((item) => Number(item.male_count));
    const femaleSeries = data.map((item) => Number(item.female_count));

    return {
      categories,
      series: [
        { name: "Nam", data: maleSeries },
        { name: "Nữ", data: femaleSeries },
      ],
    };
  };
  const fetchStatistics = async () => {
    try {
      const [dataDashBroad] = await Promise.all([
        ReaderPublishSearchServices.GetDataDashBroad(),
      ]);
      const newCardValue = dataDashBroad.data.item[0];
      const newPieChartData = dataDashBroad.data.pie_chart;
      console.log(newPieChartData);
      const newBarChartData = dataDashBroad.data.bar_chart;
      const selectedMonth = newPieChartData[0].month;
      setSelectedMonth(selectedMonth);
      newCardValue.count_success = "10";
      newCardValue.count_refuse = "10";
      setCardValue(newCardValue);
      setPieChartData(newPieChartData);
      getDataPieChartByMonth(newPieChartData, selectedMonth);
      setBarChartData(transformChartData(newBarChartData));

      // const newStatistics = {
      //   success: formatChartData(chartData, "count_success"),
      //   refuse: formatChartData(chartData, "count_refuse"),
      //   totalPrice: formatChartData(chartData, "total_price"),
      //   feedback: formatChartData(chartData, "count_feedback"),
      // };
      // setCountSuccessStatistic(newStatistics.success);
      // setCountRefuseStatistic(newStatistics.refuse);
      // setCountTotalPriceStatistic(newStatistics.totalPrice);
      // setCountFeedbackStatistic(newStatistics.feedback);
    } catch (error) {
      console.error("Failed to fetch statistics", error);
    }
  };

  function convertData(entry: DataEntry) {
    const labels: string[] = [];
    const series: number[] = [];
    for (const key in entry) {
      if (key !== "month" && key !== "id") {
        const label = fieldMapping[key as keyof typeof fieldMapping];
        const value = parseInt(
          String(entry[key as keyof DataEntry]) || "0",
          10
        );
        labels.push(label);
        series.push(value);
      }
    }
    setPieChartByMonthData({ labels, series });
  }

  const getDataPieChartByMonth = (data: any, month: string) => {
    console.log("DATA", data);
    const results = data.filter((date: any) => date.month === month);
    if (results.length > 0) {
      convertData(results[0]);
    } else {
      console.error("No data found for the selected month");
    }
    return results;
  };

  useEffect(() => {
    fetchStatistics();
  }, []);
  return (
    <div className={`${styles.wrapper}`}>
      <div className="mb-3">
        <h2 className="fw-bold p-0">Trang chủ</h2>
      </div>

      <div className="row">
        {/* Thẻ chờ duyệt | tổng số đăng ký */}
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-3">
          <StatisticsCard
            blue_card
            icon={<FontAwesomeIcon icon={faAddressCard} />}
          >
            <div className="d-flex justify-content-between row">
              <div className="col-6">
                <div>Số thẻ chờ duyệt</div>
                {cardValues ? (
                  <div className="fs-1 overflow-x-auto">
                    {cardValues.count_feedback}
                  </div>
                ) : (
                  <CustomSkeleton height={"4rem"} blue_card />
                )}
              </div>
              <div className="col-6">
                <div>Tổng số đăng ký</div>
                <div className="fs-1 overflow-x-auto">
                  <span>
                    {cardValues ? (
                      formatNumber.formatNumber(cardValues.total_count)
                    ) : (
                      <CustomSkeleton height={"4rem"} blue_card />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </StatisticsCard>
        </div>
        {/* Số thẻ đã cấp  | số thẻ từ chối */}
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-3">
          <StatisticsCard
            purple_card
            icon={<FontAwesomeIcon icon={faUsersBetweenLines} />}
          >
            <div className="row">
              <div className="col-6">
                <div>Số thẻ đã cấp </div>
                <div className="fs-1 overflow-x-auto">
                  <span>
                    {cardValues ? (
                      formatNumber.formatNumber(cardValues.count_success)
                    ) : (
                      <CustomSkeleton height={"4rem"} purple_card />
                    )}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div>Từ chối</div>
                <div className="fs-1 overflow-x-auto">
                  <span>
                    {cardValues ? (
                      formatNumber.formatNumber(cardValues.count_refuse)
                    ) : (
                      <CustomSkeleton
                        height={"4rem"}
                        variant="text"
                        purple_card
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </StatisticsCard>
        </div>
        {/* tiền kiếm được trong tháng */}
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-3">
          <StatisticsCard
            light_yellow_card
            icon={<FontAwesomeIcon icon={faMoneyBillWave} />}
          >
            <div>
              <div>Tổng tiền thu trong tháng</div>
              {cardValues ? (
                <div className="fs-1 overflow-x-auto">
                  {formatNumber.formatNumber(cardValues.total_price)}
                </div>
              ) : (
                <CustomSkeleton height={"4rem"} light_yellow_card />
              )}
            </div>
            <div></div>
          </StatisticsCard>
        </div>
        {/* Số thẻ chờ duyệt */}
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-3">
          <StatisticsCard
            light_red_card
            icon={<FontAwesomeIcon icon={faCommentDots} />}
          >
            <div>
              <div>Số góp ý chưa duyệt trong tháng</div>
              {cardValues ? (
                <div className="fs-1 overflow-x-auto">
                  {formatNumber.formatNumber(cardValues.count_feedback)}
                </div>
              ) : (
                <CustomSkeleton height={"4rem"} light_red_card />
              )}
            </div>
            <div></div>
          </StatisticsCard>
        </div>
      </div>

      <Card
        title={
          <div className="d-flex align-items-center justify-content-between row">
            <span className="col mb-2">Biểu đồ</span>
            {pieChartData && (
              <Select
                name="date"
                className="col-md-4 col-lg-2 mb-2"
                select_transparent
                admin_temp
                select_chart
                leftIcon={
                  <FontAwesomeIcon icon={faGear} style={{ color: "#fff" }} />
                }
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  getDataPieChartByMonth(pieChartData, e.target.value);
                }}
              >
                {pieChartData.map((item: any, index: any) => {
                  return (
                    <option key={index} value={item.month}>
                      {item.month}
                    </option>
                  );
                })}
              </Select>
            )}
          </div>
        }
      >
        <div className="row">
          {pieChartData ? (
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-3">
              <Card
                title={`Số lượng mỗi loại thẻ đăng ký vào tháng ${selectedMonth}`}
              >
                <div style={{ height: "42rem" }}>
                  {/* <LineChart /> */}
                  {pieChartByMonthData && typeof window !== "undefined" && (
                    <PieChartComponent data={pieChartByMonthData} />
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 mb-3">
              <CustomSkeleton variant="rectangular" height={"50rem"} />
            </div>
          )}
          {barChartData ? (
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 mb-3">
              <Card title="Đơn đăng ký theo tháng">
                <div
                  className=""
                  style={{
                    height: "42rem",
                    overflow: "hidden",
                  }}
                >
                  {typeof window !== "undefined" && (
                    <BarChartComponent
                      series={barChartData.series}
                      categories={barChartData.categories}
                      colors={["#3498db", "#e74c3c"]}
                    />
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 mb-3">
              <CustomSkeleton variant="rectangular" height={"50rem"} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
