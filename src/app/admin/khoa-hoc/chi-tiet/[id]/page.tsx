"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./ChiTiet.module.scss";
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
import { useParams } from "next/navigation";
import SectionServices from "@/services/section-services";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);

const selectedColumn = [
  { title: "Tiêu đề", data: "title" },
  { title: "Tập", data: "order" },
  // {
  //   title: "Tổng bài học",
  //   data: "createddate",
  //   render: (data: string) => {
  //     return formatDateTime.formatDate(data);
  //   },
  // },
];
const page = () => {
  const params = useParams<{ id: string }>();

  const [course, setCourse] = useState<ICourse>({} as ICourse);
  const [sections, setSections] = useState<ICourse>({} as ICourse);
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
    CourseServices.getCourseById(params.id).then((res) => {
      console.log(res.data);
      setCourse(res.data);
      setOnLoading(false);
    });
    SectionServices.GetSectionFromCourse(params.id)
      .then((res) => {
        setSections(res.sections);
      })
      .catch((err) => {
        console.log(err);
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
          <li className="breadcrumb-item">
            <Link href="/admin/khoa-hoc/danh-sach">Danh sách</Link>
          </li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Chi tiết
          </li>
        </ol>
      </div>
      {/* Data Table */}
      <Card
        title={
          <strong>
            Quản lý khóa học{" - "}
            <span className="text-secondary">{course.title}</span>
          </strong>
        }
      >
        <div className="d-flex">
          {/* <Button
            success_btn
            rounded
            to="tao-moi"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            Tạo mới
          </Button> */}
          {/* <Button
            danger_btn
            rounded
            leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
          >
            Thùng rác
          </Button> */}
        </div>
        <hr></hr>
        {!onLoading ? (
          <DataTable
            data={sections}
            selectedColumn={selectedColumn}
            edit_direction={"/admin/bai-giang/chi-tiet"}
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
