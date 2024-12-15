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
    // setOnLoading(true);
    // CourseServices.Search(SetFormValues(data))
    //   .then((res) => {
    //     if (res) {
    //       setOnLoading(false);
    //       setFormData(res.data);
    //       handleSuccessToast();
    //     } else {
    //       handleErrorToast("Đã có lỗi xảy ra");
    //     }
    //   })
    //   .catch((e) => {
    //     setOnLoading(false);
    //     handleErrorToast("Đã có lỗi xảy ra");
    //   });
  };
  const [formData, setFormData] = useState<any>();
  const [onLoading, setOnLoading] = useState<boolean>(true);
  const searchFeedBack = () => {
    setOnLoading(true);
    // CourseServices.Search(SetFormValues({}))
    //   .then((res) => {
    //     if (res.data) {
    //       setOnLoading(false);
    //       setFormData(res.data);
    //     } else {
    //       setOnLoading(false);
    //       handleErrorToast("Đã có lỗi xảy ra");
    //     }
    //   })
    //   .catch((e) => {
    //     setOnLoading(false);
    //     handleErrorToast("Đã có lỗi xảy ra");
    //   });
  };
  const handleUpdateStatusFeedback = async (id: any) => {
    // const result = await CourseServices.UpdateStatusFeedBack(id);
    // if (result.statusCode === 200) {
    //   handleSuccessToast();
    //   searchFeedBack();
    // } else {
    //   handleErrorToast("Đã xảy ra lỗi");
    // }
  };
  useEffect(() => {
    searchFeedBack();
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
            Thêm
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
            data={formData}
            selectedColumn={selectedColumn}
            edit_direction={"tra-cuu-bao-cao/chi-tiet"}
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
