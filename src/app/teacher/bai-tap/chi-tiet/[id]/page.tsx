"use client";
import { useParams, useRouter } from "next/navigation";
import Card from "@/modules/common/components/Card";
import React, { Suspense, useEffect, useState } from "react";
import Button from "@/modules/common/components/Button";
import styles from "./ChiTiet.module.scss";
import SkeletonData from "@/modules/common/components/skeleton-data";
import { useToastContext } from "@/lib/context/toast-context";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import ExercisesServices from "@/services/exercises-services";
import moment from "moment";
import "moment/locale/vi";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);
const page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  moment.locale("vi");
  const [onLoading, setOnLoading] = useState<boolean>(true);
  const [exerciseData, setExerciseData] = useState<IExercise>({} as IExercise);
  const [list, setList] = useState<IExerciseOption[]>();
  const [isOptions, setIsOptions] = useState<boolean>(false);
  const [isPlankAnswer, setIsPlankAnswer] = useState<boolean>(false);
  const [type, setType] = useState<string>("Trắch nghiệm");
  const selectedColumn = [
    { title: "Câu trả lời", data: "text" },
    {
      title: "Đáp án",
      data: "isCorrect",
      render: (data: boolean) => {
        return data === true ? "Đúng" : "Sai";
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
  const handleDeleteOptions = async (id: string) => {
    try {
      const updatedList = list ? list.filter((item) => item._id !== id) : [];
      const updatedExercise: IExercise = {
        ...exerciseData,
        options: updatedList,
      };
      return await ExercisesServices.UpdateExercise(params.id, updatedExercise);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài tập", error);
    }
  };
  useEffect(() => {
    ExercisesServices.GetExerciseById(params.id)
      .then((res) => {
        if (
          res.exercise.type === "single-choice" ||
          res.exercise.type === "multiple-choice"
        ) {
          setType("Trắc nghiệm");
          setIsOptions(true);
          setIsPlankAnswer(false);
        } else if (res.exercise.type === "fill-in-the-blank") {
          setType("Điền từ khuyết thiếu");
          setIsOptions(false);
          setIsPlankAnswer(true);
        } else {
          setType("Phát âm");
          setIsOptions(false);
          setIsPlankAnswer(false);
        }
        setOnLoading(false);
        setExerciseData(res.exercise);
        setList(res.exercise.options);
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
                            className="text-nowrap w-100 justify-content-around fs-5"
                            to={`/teacher/bai-tap/chinh-sua/${params.id}`}
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
                            onClick={() =>
                              router.push(
                                `/teacher/bai-giang/chi-tiet/${exerciseData.sectionId}`
                              )
                            }
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
              <div className="">
                {exerciseData && (
                  <div className=" mb-3">
                    <div className="mb-3 ">
                      <label className="form-label">Câu hỏi:</label>
                      <strong className="ms-2">{exerciseData.question}</strong>
                    </div>
                    {isPlankAnswer && (
                      <div className="mb-3 ">
                        <label className="form-label">Câu trả lời:</label>
                        <strong className="ms-2 text-success">
                          {exerciseData.blankAnswer}
                        </strong>
                      </div>
                    )}
                    {type && (
                      <div className="mb-3 ">
                        <label className="form-label">Loại câu hỏi:</label>
                        <strong className="ms-2">{type}</strong>
                      </div>
                    )}
                    <div className="mb-3 ">
                      <label className="form-label">Ngày tạo:</label>
                      <strong className="ms-2">
                        {moment(exerciseData.createdAt).calendar()}
                      </strong>
                    </div>
                    <div className="mb-3 ">
                      <label className="form-label">Ngày cập nhật:</label>
                      <strong className="ms-2">
                        {moment(exerciseData.updatedAt).calendar()}
                      </strong>
                    </div>
                  </div>
                )}
                {isOptions && (
                  <div>
                    <hr />
                    <label className="form-label fw-bold fs-3 my-3">
                      Danh sách câu trả lời:
                    </label>
                    {!onLoading && list ? (
                      <DataTable
                        data={list}
                        selectedColumn={selectedColumn}
                        edit_direction={"chi-tiet"}
                        show_detail={false}
                        delete_handle={handleDeleteOptions}
                      />
                    ) : (
                      <TableSkeleton />
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <SkeletonData />
        )}
      </div>
    </Suspense>
  );
};

export default page;
