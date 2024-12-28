"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./DanhSach.module.scss";
import Card from "@/modules/common/components/Card";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import CourseServices from "@/services/course-services";
import { useToastContext } from "@/lib/context/toast-context";
import Button from "@/modules/common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);
const selectedColumn = [
  { title: "Tiêu đề", data: "title" },
  { title: "Miêu tả", data: "description" },
  { title: "Tổng bài học", data: "totalSections" },
  { title: "Tổng học viên", data: "totalEnrolledUsers" },
  // {
  //   title: "Tổng bài học",
  //   data: "createddate",
  //   render: (data: string) => {
  //     return formatDateTime.formatDate(data);
  //   },
  // },
];
const page = () => {
  const { HandleOpenToast } = useToastContext();
  const handleSuccessToast = () => {
    HandleOpenToast({
      type: "success",
      content: "Lấy dữ liệu thành công!",
    });
  };
  const handleErrorToast = (message: string) => {
    HandleOpenToast({
      type: "error",
      content: `${message}! Vui lòng thử lại`,
    });
  };
  const [List, setList] = useState<any>();
  const [onLoading, setOnLoading] = useState<boolean>(true);
  useEffect(() => {
    setOnLoading(true);
    CourseServices.GetAllCourse()
      .then((res) => {
        setList(res.data);
        setOnLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3 ">
          <li className="breadcrumb-item">
            <Link href="/teacher">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Khóa học</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Danh sách
          </li>
        </ol>
      </div>
      {/* Data Table */}
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <div className="fw-bold">Quản lý khóa học</div>
            <div>
              <div className="col mt-2">
                <Button
                  success_btn
                  rounded
                  className="fs-5"
                  to="tao-moi"
                  leftIcon={<FontAwesomeIcon icon={faPlus} />}
                >
                  Tạo mới
                </Button>
              </div>
            </div>
          </div>
        }
      >
        {/* <hr></hr> */}
        {!onLoading ? (
          <DataTable
            data={List}
            selectedColumn={selectedColumn}
            edit_direction={"chi-tiet"}
            delete_handle={CourseServices.DeleteCourse}
          />
        ) : (
          <TableSkeleton />
        )}
      </Card>
    </div>
  );
};

export default page;
