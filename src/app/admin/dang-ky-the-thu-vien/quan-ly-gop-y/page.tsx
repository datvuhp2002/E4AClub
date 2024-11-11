"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./QuanLyGopY.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import FeedbackLibraryServices from "@/services/feedback-library-services";
import { SetFormValues } from "@/common/ucform-heplers";
import { useToastContext } from "@/lib/context/toast-context";
import formatDateTime from "@/common/format_date";
import FormAdminComment from "@/modules/layout/admin/components/form-admin-comment";
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
    { title: "Tiêu đề", data: "title" },
    { title: "Nội dung", data: "content" },
    {
      title: "Ngày gửi",
      data: "createddate",
      render: (data: string) => {
        return formatDateTime.formatDate(data);
      },
    },
    { title: "Trạng Thái", data: "status" },
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
  const onSubmit: SubmitHandler<any> = (data) => {
    setOnLoading(true);
    FeedbackLibraryServices.Search(SetFormValues(data))
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
  const [formData, setFormData] = useState<any>();
  const [onLoading, setOnLoading] = useState<boolean>(true);
  const searchFeedBack = () => {
    setOnLoading(true);
    FeedbackLibraryServices.Search(SetFormValues({}))
      .then((res) => {
        if (res.data) {
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
  const handleUpdateStatusFeedback = async (id: any) => {
    const result = await FeedbackLibraryServices.UpdateStatusFeedBack(id);
    if (result.statusCode === 200) {
      handleSuccessToast();
      searchFeedBack();
    } else {
      handleErrorToast("Đã xảy ra lỗi");
    }
  };
  useEffect(() => {
    searchFeedBack();
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <h2 className="fw-bold p-0">Quản lý góp ý</h2>
        <ol className="breadcrumb mb-3 ">
          <li className="breadcrumb-item">
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item breadcrumb-active">
            đăng ký thẻ thư viện
          </li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            quản lý góp ý
          </li>
        </ol>
      </div>
      {/* Data Table */}
      <Card title="Quản lý góp ý">
        <FormAdminComment
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          getValues={getValues}
          setValue={setValue}
          clearErrors={clearErrors}
          getData={() => searchFeedBack()}
        />
        <hr></hr>
        {!onLoading ? (
          <DataTable
            data={formData}
            selectedColumn={selectedColumn}
            edit_direction={"tra-cuu-bao-cao/chi-tiet"}
            isComment
            action={handleUpdateStatusFeedback}
          />
        ) : (
          <TableSkeleton />
        )}
      </Card>
    </div>
  );
};

export default page;
