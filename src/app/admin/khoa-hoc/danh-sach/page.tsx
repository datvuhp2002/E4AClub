"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./DanhSach.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import CourseServices from "@/services/course-services";
import { SetFormValues } from "@/common/ucform-heplers";
import { useToastContext } from "@/lib/context/toast-context";
import formatDateTime from "@/common/format_date";
import Button from "@/modules/common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);
interface Course {
  _id: string;
  title: string;
  description: string;
  totalSections: number;
  totalEnrolledUsers: number;
}
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
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<any>({ mode: "all" });
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
    CourseServices.getAllCourse()
      .then((res) => {
        console.log(res.data);
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
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Khóa học</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Danh sách
          </li>
        </ol>
      </div>
      {/* Data Table */}
      <Card title={<strong>Quản lý khóa học</strong>}>
        <div className="d-flex">
          <Button
            success_btn
            rounded
            to="tao-moi"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            Tạo mới
          </Button>
          <Button
            danger_btn
            rounded
            leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
          >
            Thùng rác
          </Button>
        </div>
        <hr></hr>
        {!onLoading ? (
          <DataTable
            data={List}
            selectedColumn={selectedColumn}
            edit_direction={"chi-tiet"}
            delete_handle={console.log}
          />
        ) : (
          <TableSkeleton />
        )}
      </Card>
    </div>
  );
};

export default page;
