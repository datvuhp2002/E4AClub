"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./DanhSach.module.scss";
import { useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import { useToastContext } from "@/lib/context/toast-context";
import formatDateTime from "@/common/format_date";
import Button from "@/modules/common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UserServices from "@/services/user-services";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);
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
  const selectedColumn = [
    { title: "Họ và tên", data: "name" },
    { title: "Email", data: "email" },
    {
      title: "Ngày tạo",
      data: "createdAt",
      render: (data: string) => {
        return formatDateTime.formatDate(data);
      },
    },
  ];
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
  const [list, setList] = useState<any>();
  const [onLoading, setOnLoading] = useState<boolean>(true);
  useEffect(() => {
    setOnLoading(true);
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3 ">
          <li className="breadcrumb-item">
            <Link href="/teacher">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Bài giảng</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Danh sách
          </li>
        </ol>
      </div>
      {/* Data Table */}
      <Card title={<strong>Quản lý bài giảng</strong>}>
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
            data={list}
            selectedColumn={selectedColumn}
            edit_direction={"chi-tiet"}
            delete_handle={() => {
              return Promise.resolve({ success: true });
            }}
          />
        ) : (
          <TableSkeleton />
        )}
      </Card>
    </div>
  );
};

export default page;
