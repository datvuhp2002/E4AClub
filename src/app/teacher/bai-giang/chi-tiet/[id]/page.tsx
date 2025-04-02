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
  const [sectionData, setSectionData] = useState<IGetSectionRes>(
    {} as IGetSectionRes
  );
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
    setOnLoading(true);
    Promise.all([
      SectionServices.GetSection(params.id),
      ExercisesServices.GetExercisesBySection(params.id),
    ])
      .then(([sectionRes, exercisesRes]) => {
        setSectionData(sectionRes.section);
        setList(exercisesRes.exercises);
      })
      .catch((err) => {
        handleErrorToast("Đã xảy ra lỗi");
      })
      .finally(() => {
        setOnLoading(false);
      });
  }, []);
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <div className={styles.wrapper}>
        {sectionData ? (
          <div className={`${styles.wrapper} mb-5`}>
            <div className="">
              <ol className="breadcrumb mb-3">
                <li className="breadcrumb-item">Bài giảng</li>
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
                      Chi tiết bài giảng -
                      <strong className="ms-2 text-danger">
                        {sectionData.title}
                      </strong>
                    </div>
                    <div className="col-sm-12 col-md-3 d-flex fs-5 align-items-center justify-content-end mt-2">
                      <div className="row">
                        <div className="col">
                          <Button
                            rounded
                            success_btn
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            className="text-nowrap w-100 justify-content-around fs-5"
                            to={`/teacher/bai-giang/chinh-sua/${params.id}`}
                          >
                            sửa
                          </Button>
                        </div>
                        <div className="col">
                          {sectionData.course && (
                            <Button
                              rounded
                              leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
                              className="text-nowrap w-100 justify-content-around"
                              transparent_btn
                              onClick={() =>
                                router.push(
                                  `/teacher/khoa-hoc/chi-tiet/${sectionData.course._id}`
                                )
                              }
                            >
                              Quay lại
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className={`${styles.wrapper_learning_card} row`}>
                <div className="col-12 col-md-6 mb-3">
                  <div className="mb-3 ">
                    <label className="form-label">Khóa học:</label>
                    <strong className="ms-2">
                      {sectionData.course && sectionData.course.title}
                    </strong>
                  </div>
                  <div className="mb-3 ">
                    <label className="form-label">
                      Bài số:
                      <strong className="ms-2">{sectionData.order}</strong>
                    </label>
                    <div></div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tiêu đề:</label>
                    <strong className="fs-4 ms-2">{sectionData.title}</strong>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">YouTube Video:</label>
                  </div>
                  <div className={`${styles.video_thumbnail}`}>
                    <div className="mb-3 w-100 h-100">
                      <div className="w-100 h-100">
                        <iframe
                          className={`${styles.video_preview} w-100`}
                          src={`https://www.youtube.com/embed/${sectionData.video}`}
                          allowFullScreen
                          title="YouTube video preview"
                          style={{
                            height: "calc(30vh + 10rem)",
                          }}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label">Nội dung:</label>
                  </div>
                  <div className={`${styles.video_thumbnail}`}>
                    <div className="mb-3 w-100 h-100">
                      <div className="w-100 h-100">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: sectionData.content,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="mt-3">
              {list && (
                <Card
                  title={
                    <div className="d-flex align-items-center justify-content-between">
                      Danh sách bài tập
                      <div className="d-flex mt-2">
                        <Button
                          success_btn
                          rounded
                          className="fs-5"
                          to={`/teacher/bai-tap/tao-moi?learning=${params.id}`}
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
                      edit_direction={"/teacher/bai-tap/chi-tiet"}
                      delete_handle={ExercisesServices.DeleteSection}
                    />
                  ) : (
                    <TableSkeleton />
                  )}
                </Card>
              )}
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
