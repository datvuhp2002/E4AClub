"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./TraCuuBaoCao.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import FormAdminResearch from "@/modules/layout/admin/components/form-admin-research";
import Button from "@/modules/common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import ReaderPublishSearchServices from "@/services/reader-publish-search-services";
import { SetFormValues } from "@/common/ucform-heplers";
import { useToastContext } from "@/lib/context/toast-context";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
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
  const selectedColumn = [
    { title: "Mã ĐK", data: "coderegister" },
    { title: "Tên bạn đọc", data: "fullname" },
    { title: "Loại Thẻ", data: "cardtype" },
    { title: "Số điện thoại", data: "tel" },
    {
      title: "Ngày đăng ký",
      data: "createddate",
    },
    {
      title: "Trạng Thái",
      data: "status",
      render(data: string) {
        return getStatusElementForDataTable(data);
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
  const onSubmit: SubmitHandler<any> = (data) => {
    setOnLoading(true);
    ReaderPublishSearchServices.SearchReportExcel(SetFormValues(data))
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

  const getSearchReportExcel = () => {
    setOnLoading(true);
    ReaderPublishSearchServices.SearchReportExcel(SetFormValues({}))
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
  const createReportExcel = async () => {
    const formatData = SetFormValues(getValues());
    return await ReaderPublishSearchServices.CreateReportExcel(
      SetFormValues(formatData)
    ).then((res) => {
      console.log(res.data);
      const link = document.createElement("a");
      link.href = `${process.env.FLIPBOOK_URL}${res.data}`;
      link.download = "report.xlsx";
      link.click();
    });
  };
  const onClickCreateReportExcel = async () => {
    await createReportExcel();
  };
  useEffect(() => {
    getSearchReportExcel();
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <h2 className="fw-bold p-0">Tra cứu báo cáo</h2>
        <ol className="breadcrumb mb-3 ">
          <li className="breadcrumb-item">
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item breadcrumb-active">
            đăng ký thẻ thư viện
          </li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            tra cứu báo cáo
          </li>
        </ol>
      </div>
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <span> Tra cứu bạn đọc</span>
            <Button
              transparent_btn
              leftIcon={<FontAwesomeIcon icon={faSquarePollVertical} />}
              className="fs-3"
              onClick={onClickCreateReportExcel}
            >
              Báo cáo
            </Button>
          </div>
        }
      >
        <FormAdminResearch
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          getValues={getValues}
          setValue={setValue}
          clearErrors={clearErrors}
          getData={getSearchReportExcel}
        />
        <hr></hr>
        {!onLoading ? (
          <DataTable
            data={formData}
            selectedColumn={selectedColumn}
            edit_direction={"tra-cuu-bao-cao/chi-tiet"}
          />
        ) : (
          <TableSkeleton />
        )}
      </Card>
    </div>
  );
};

export default page;
