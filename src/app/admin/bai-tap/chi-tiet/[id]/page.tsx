"use client";
import { useParams, useRouter } from "next/navigation";
import Card from "@/modules/common/components/Card";
import React, { Suspense, useEffect, useState } from "react";
import Button from "@/modules/common/components/Button";
import styles from "./ChiTiet.module.scss";
import SkeletonData from "@/modules/common/components/skeleton-data";
import { useToastContext } from "@/lib/context/toast-context";
import SectionServices from "@/services/section-services";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import ExercisesServices from "@/services/exercises-services";
import formatDateTime from "@/common/format_date";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);
const page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [onLoading, setOnLoading] = useState<boolean>(true);
  const [exerciseData, setExerciseData] = useState<IExercise>({} as IExercise);
  const [list, setList] = useState<IExercise>();
  const selectedColumn = [
    { title: "Câu hỏi", data: "question" },
    {
      title: "Ngày tạo",
      data: "createdAt",
      render: (data: string) => {
        return formatDateTime.formatDate(data);
      },
    },
  ];
  const { HandleOpenToast } = useToastContext();
  const handleSuccessToast = (message: string) => {
    HandleOpenToast({
      type: "success",
      content: message,
    });
  };
  const handleErrorToast = (message: string) => {
    HandleOpenToast({
      type: "error",
      content: `${message}! Vui lòng thử lại`,
    });
  };

  useEffect(() => {
    ExercisesServices.GetExerciseById(params.id)
      .then((res) => {
        console.log(res);
        setExerciseData(res.exercise);
      })
      .catch((err) => {
        handleErrorToast("Đã xảy ra lỗi");
      });
  }, []);
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <div className={styles.wrapper}>
        {exerciseData ? (
          <div className={`${styles.wrapper} mb-5`}>
            <div className="">
              <ol className="breadcrumb mb-3">
                <li className="breadcrumb-item">
                  <Link href="/admin">Trang chủ</Link>
                </li>
                <li className="breadcrumb-item">Bài tập</li>
                <li className="breadcrumb-item breadcrumb-active fw-bold">
                  Chi tiết
                </li>
              </ol>
            </div>
            {/* Data Table */}
            <Card
              title={
                <div className="d-flex align-items-center justify-content-between">
                  <div className="row w-100">
                    <div className="col-sm-12 col-md-9 mt-2">
                      Chi tiết bài tập
                    </div>
                    <div className="col-sm-12 col-md-3 d-flex fs-5 align-items-center justify-content-end">
                      <div className="row">
                        <div className="col">
                          <Button
                            rounded
                            success_btn
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            className="text-nowrap w-100 justify-content-around fs-4"
                            to={`/admin/bai-giang/chinh-sua/${params.id}`}
                          >
                            sửa
                          </Button>
                        </div>
                        <div className="col">
                          <Button
                            rounded
                            leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
                            className="text-nowrap w-100 justify-content-around"
                            transparent_btn
                            onClick={() => router.back()}
                          >
                            Quay lại
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="row">
                <div className="col-12 col-md-6 mb-3"></div>
                <div className="col-12 col-md-6 mb-3"></div>
              </div>
            </Card>
            <div className="mt-3">
              <Card
                title={
                  <div className="d-flex align-items-center justify-content-between">
                    Danh sách bài tập
                    <div className="d-flex mt-2">
                      <Button
                        success_btn
                        rounded
                        className="fs-5"
                        to={`/admin/bai-tap/tao-moi?learning=${params.id}`}
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                      >
                        Tạo mới
                      </Button>
                    </div>
                  </div>
                }
              >
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
          </div>
        ) : (
          <SkeletonData />
        )}
      </div>
    </Suspense>
  );
};

export default page;
