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
import {
  faLeftLong,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);
const selectedColumnEnrollUser = [
  { title: "Email", data: "email" },
  { title: "Họ và tên", data: "name" },
];
const page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [onLoadingEnrollUser, setOnLoadingEnrollUser] = useState<boolean>(true);
  const [enrollUser, setEnrollUser] = useState<ICourse>({} as ICourse);
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
  useEffect(() => {
    setOnLoadingEnrollUser(true);
    CourseServices.GetEnrolledUsers(params.id)
      .then((res) => {
        setEnrollUser(res.enrolledUsers);
        setOnLoadingEnrollUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3 ">
          <li className="breadcrumb-item">Trang chủ</li>
          <li className="breadcrumb-item">Khóa học</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Danh sách học viên
          </li>
        </ol>
      </div>
      {/* Students */}
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <label className="form-label fw-bold fs-3 ">
              Danh sách người tham gia
            </label>
            <div>
              <Button
                rounded
                leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
                className="text-nowrap w-100 justify-content-around fs-5"
                transparent_btn
                onClick={() =>
                  router.push(`/admin/khoa-hoc/chi-tiet/${params.id}`)
                }
              >
                Quay lại
              </Button>
            </div>
          </div>
        }
      >
        {!onLoadingEnrollUser && enrollUser ? (
          <DataTable
            key={`enroll-user-table-${params.id}`}
            data={enrollUser}
            selectedColumn={selectedColumnEnrollUser}
            edit_direction={"/admin/tai-khoan/chi-tiet"}
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
