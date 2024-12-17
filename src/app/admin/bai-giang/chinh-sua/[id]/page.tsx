"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./ChinhSua.module.scss";
import { Controller, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import { Autocomplete, Skeleton, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import CourseServices from "@/services/course-services";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import SectionServices from "@/services/section-services";
import { youtubeParser } from "@/helpers";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import SkeletonData from "@/modules/common/components/skeleton-data";
import CustomSkeleton from "@/modules/common/components/custom-skeleton";
const CKEditorComponent = dynamic(
  () => import("@/modules/common/components/ck-editor"),
  { ssr: false }
);

const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const params = useParams<{ id: string }>();
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
  const [courses, setCourses] = useState([]);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [hasCourse, setHasCourse] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const videoUrl = watch("video");

  useEffect(() => {
    const id = youtubeParser(videoUrl);
    if (id) {
      setVideoId(id);
      setValue("video", `https://www.youtube.com/embed/${id}`);
    } else {
      setVideoId(null);
    }
  }, [videoUrl, setValue]);
  const handleSubmitFormUpdate = async (data: any) => {
    if (videoId === null) {
      handleErrorToast("Đường dẫn không hợp lệ");
    } else {
      data.video = videoId;
      SectionServices.UpdateSection(params.id, data)
        .then((res) => {
          console.log(res);
          if (res.success) {
            handleSuccessToast("Cập nhật thành công");
          } else {
            handleErrorToast("Cập nhật thất bại");
          }
        })
        .catch((e) => {
          console.error(e);
          handleErrorToast("Cập nhật thất bại");
        });
    }
  };
  useEffect(() => {
    CourseServices.getAllCourse()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((errors) => {
        console.error(errors);
      });
    SectionServices.GetSection(params.id)
      .then((res) => {
        if (res.success) {
          setLoading(false);
          console.log(res);
          setValue("title", res.section.title);
          setValue("order", res.section.order);
          setValue("content", res.section.content);
          setValue(
            "video",
            `https://www.youtube.com/embed/${res.section.video}`
          );
          setSelectedCourse({
            label: res.data.name,
            id: res.section.course,
          });

          setVideoId(res.section.video);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Bài giảng</li>
          <li className="breadcrumb-item">Chi tiết</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Chỉnh sửa
          </li>
        </ol>
      </div>
      {/* Data Table */}
      {isLoading ? (
        <SkeletonData />
      ) : (
        <Card
          title={
            <div className="d-flex align-items-center justify-content-between">
              <div className=" mt-2 fw-bold">Chỉnh sửa bài giảng</div>
              <div className=" mt-2">
                <Button
                  rounded
                  success_btn
                  leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                  className="text-nowrap w-100 justify-content-around fs-4"
                  onClick={handleSubmit(handleSubmitFormUpdate)}
                >
                  sửa
                </Button>
              </div>
            </div>
          }
        >
          <form>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <div className="mb-3 ">
                  <label className="form-label">Khóa học:</label>
                  <Controller
                    name="courseId"
                    control={control}
                    rules={{ required: "Vui lòng chọn khóa học" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        value={selectedCourse}
                        options={courses}
                        getOptionLabel={(option) =>
                          `${option.title} - ${option._id}`
                        }
                        isOptionEqualToValue={(option: any, value: any) =>
                          option._id === value._id
                        }
                        onChange={(event, value) => {
                          field.onChange(value ? value._id : null);
                          setSelectedCourse(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Khóa học"
                            error={!!errors._id}
                            helperText={
                              errors._id?.message
                                ? String(errors._id.message)
                                : ""
                            }
                            InputProps={{
                              ...params.InputProps,
                              readOnly: hasCourse,
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  {errors.courseId && (
                    <p className="text-danger mt-2">
                      {String(errors.courseId?.message)}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Tiêu đề:</label>
                  <input
                    type="text"
                    className="form-control p-3 fs-5"
                    placeholder="Tiều đề bài giảng"
                    {...register("title", {
                      required: "Vui lòng nhập tiêu đề bài giảng",
                    })}
                  />
                  {errors.title && (
                    <p className="text-danger mt-2">
                      {String(errors.title?.message)}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Tập:</label>
                  <input
                    type="number"
                    min={0}
                    className="form-control p-3 fs-5"
                    placeholder="Tập khóa học"
                    {...register("order", {
                      required: "Vui lòng nhập tập",
                    })}
                  />
                  {errors.number && (
                    <p className="text-danger mt-2">
                      {String(errors.number?.message)}
                    </p>
                  )}
                </div>
                <CKEditorComponent
                  value={watch("content")}
                  onChange={(data) => setValue("content", data)}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div className="mb-3">
                  <label className="form-label">YouTube Video URL:</label>
                  <input
                    type="text"
                    className="form-control p-3 fs-5"
                    placeholder="URL của video YouTube"
                    {...register("video", {
                      required: "Vui lòng nhập URL video YouTube",
                    })}
                  />
                  {errors.video && (
                    <p className="text-danger mt-2">
                      {String(errors.video?.message)}
                    </p>
                  )}
                </div>
                {videoId ? (
                  <div className={`${styles.video_thumbnail}`}>
                    <div className="mb-3 w-100 h-100">
                      <label className="form-label">Xem trước:</label>
                      <div className="w-100 h-100">
                        <iframe
                          className={`${styles.video_preview} w-100`}
                          src={`https://www.youtube.com/embed/${videoId}`}
                          allowFullScreen
                          title="YouTube video preview"
                          style={{
                            height: "calc(30vh + 10rem)", // Example, you can customize the calculation
                          }}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-danger fw-bold">
                    Không có video hợp lệ để hiển thị.
                  </p>
                )}
              </div>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default page;
