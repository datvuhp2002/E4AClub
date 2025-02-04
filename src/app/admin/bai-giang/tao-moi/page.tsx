"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./TaoMoi.module.scss";
import { Controller, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import { Autocomplete, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import CourseServices from "@/services/course-services";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import SectionServices from "@/services/section-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";

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
  const { HandleOpenToast } = useToastContext();
  const searchParams = useSearchParams();
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
  const [courseParams, setCourseParams] = useState<string>("");
  const [courses, setCourses] = useState([]);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [hasCourse, setHasCourse] = useState(false);

  const youtubeParser = (url: string) => {
    if (!url) return false;
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

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
  const handleSubmitFormUrlAdd = async (data: any) => {
    data.video = videoId;
    if (courseParams) {
      data.courseId = courseParams;
    }
    SectionServices.AddSection(data)
      .then((res) => {
        if (res.success) {
          handleSuccessToast("Tạo thành công");
        } else {
          handleErrorToast("Tạo thất bại");
        }
      })
      .catch((e) => {
        console.error(e);
        handleErrorToast("Tạo thất bại");
      });
  };
  useEffect(() => {
    const searchParamsCourse = searchParams.get("course");
    if (searchParamsCourse) {
      setCourseParams(searchParamsCourse);
    }
    CourseServices.GetAllCourse()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((errors) => {
        console.error(errors);
      });
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Bài giảng</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">Tạo mới</li>
        </ol>
      </div>
      {/* Data Table */}
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <div className=" mt-2 fw-bold">Tạo bài giảng</div>
            <div className="d-flex mt-2">
              <Button
                onClick={handleSubmit(handleSubmitFormUrlAdd)}
                rounded
                success_btn
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                className="text-nowrap w-100 justify-content-around fs-5"
              >
                Tạo mới
              </Button>
            </div>
          </div>
        }
      >
        <form>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              {!courseParams && (
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
              )}
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
                  {...register("video", {})}
                />
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
    </div>
  );
};

export default page;
