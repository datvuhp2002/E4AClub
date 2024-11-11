"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./DuyetDangKy.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import FormAdminApproveRegistration from "@/modules/layout/admin/components/form-admin-approve-registration";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import { useToastContext } from "@/lib/context/toast-context";
import formatDateTime from "@/common/format_date";
import dynamic from "next/dynamic";
import ReaderPublishSearchServices from "@/services/reader-publish-search-services";
import { SetFormValues } from "@/common/ucform-heplers";
import { getStatusElementForDataTable } from "@/modules/common/components/render-status";
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
  const [onLoading, setOnLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>();
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

  const onSubmit: SubmitHandler<any> = (data) => {
    setOnLoading(true);
    console.log(data);
    ReaderPublishSearchServices.Search(SetFormValues(data))
      .then((res) => {
        if (res) {
          setOnLoading(false);
          setFormData(res.data);
          handleSuccessToast();
        } else {
          handleErrorToast("Đã có lỗi xảy ra");
        }
      })
      .catch((e) => {
        setOnLoading(false);
        handleErrorToast("Đã có lỗi xảy ra");
      });
  };
  const selectedColumn = [
    { title: "Mã ĐK", data: "coderegister" },
    { title: "Tên bạn đọc", data: "fullname" },
    { title: "Loại Thẻ", data: "cardtype" },
    { title: "CMND/CCCD", data: "cccd" },
    {
      title: "Ngày đăng ký",
      data: "createddate",
      render: (data: string) => {
        return formatDateTime.formatDate(data);
      },
    },
    {
      title: "Trạng Thái",
      data: "status",
      render: (data: string) => {
        return getStatusElementForDataTable(data);
      },
    },
    { title: "Hình Thức Nhận", data: "receivetype" },
  ];
  const getRegisterSearch = () => {
    setOnLoading(true);
    ReaderPublishSearchServices.Search(SetFormValues({}))
      .then((res) => {
        if (res) {
          setOnLoading(false);
          setFormData(res.data);
        } else {
          setOnLoading(false);
          handleErrorToast("Đã có lỗi xảy ra");
        }
      })
      .catch((e) => {
        setOnLoading(false);
        handleErrorToast("Đã có lỗi xảy ra");
      });
  };
  useEffect(() => {
    getRegisterSearch();
  }, []);
  return (
    <Suspense fallback={<div>Đang tải ....</div>}>
      <div className={`${styles.wrapper} mb-5`}>
        <div className="">
          <h2 className="fw-bold p-0">Duyệt đăng ký</h2>
          <ol className="breadcrumb mb-3 ">
            <li className="breadcrumb-item">
              <Link href="/admin">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item breadcrumb-active">
              đăng ký thẻ thư viện
            </li>
            <li className="breadcrumb-item breadcrumb-active fw-bold">
              duyệt đăng ký
            </li>
          </ol>
        </div>
        {/* Data Table */}
        <Card title="Tra cứu bạn đọc">
          <FormAdminApproveRegistration
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            getValues={getValues}
            setValue={setValue}
            clearErrors={clearErrors}
            getRegisterSearch={getRegisterSearch}
          />
          <hr></hr>
          {!onLoading ? (
            <DataTable
              data={formData}
              selectedColumn={selectedColumn}
              edit_direction={"duyet-dang-ky/chi-tiet"}
            />
          ) : (
            <TableSkeleton />
          )}
        </Card>
      </div>
    </Suspense>
  );
};

export default page;
