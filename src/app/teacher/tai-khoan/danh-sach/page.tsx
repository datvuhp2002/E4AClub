"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./DanhSach.module.scss";
import Card from "@/modules/common/components/Card";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import formatDateTime from "@/common/format_date";
import Button from "@/modules/common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserServices from "@/services/user-services";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);
const page = () => {
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
  const [list, setList] = useState<any>();
  const [onLoading, setOnLoading] = useState<boolean>(true);
  useEffect(() => {
    setOnLoading(true);
    UserServices.GetAllUser()
      .then((res) => {
        setList(res.result);
        setOnLoading(false);
      })
      .catch((errors) => {});
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3 ">
          <li className="breadcrumb-item">
            <Link href="/teacher">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Tài khoản</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Danh sách
          </li>
        </ol>
      </div>
      {/* Data Table */}
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <div className="fw-bold">Quản lý tài khoản</div>
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
            data={list}
            selectedColumn={selectedColumn}
            edit_direction={"chi-tiet"}
            delete_handle={UserServices.DeleteUser}
          />
        ) : (
          <TableSkeleton />
        )}
      </Card>
    </div>
  );
};

export default page;
