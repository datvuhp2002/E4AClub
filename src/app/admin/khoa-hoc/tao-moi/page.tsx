"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./TaoMoi.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import { useToastContext } from "@/lib/context/toast-context";
import InputField from "@/modules/common/components/input-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faQuoteLeft,
  faSignature,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import CourseServices from "@/services/course-services";
import Image from "@/modules/common/components/Image";

const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<ICreateCourse>();
  const [thumbnail, setThumbnail] = useState<{
    image: string | ArrayBuffer | null;
  }>({
    image: null,
  });
  const { HandleOpenToast } = useToastContext();
  const [onLoading, setOnLoading] = useState<boolean>(false);
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
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      let reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setThumbnail({ image: event.target.result }); // Chỉ lưu string
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const resetFormValues = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      setValue(key as keyof ICreateCourse, "");
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof ICreateCourse);
    });
  };
  const handleSubmitCreateCourse: SubmitHandler<ICreateCourse> = async (
    data
  ) => {
    setOnLoading(true);
    try {
      const result = await CourseServices.CreateCourse(data);
      if (result && result.success) {
        setOnLoading(false);
        handleSuccessToast("Tạo khóa học thành công");
      } else {
        setOnLoading(false);
        handleErrorToast("Tạo khóa học thất bại");
      }
    } catch (err) {
      console.error(err);
      setOnLoading(false);
      handleErrorToast("Tạo khóa học thất bại");
    }
    resetFormValues();
  };
  useEffect(() => {}, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Khóa học</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">Tạo mới</li>
        </ol>
      </div>
      {/* Data Table */}
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <strong>
              Tạo khóa học{" "}
              {onLoading && (
                <FontAwesomeIcon icon={faSpinner} spin className="fs-2 ms-2" />
              )}
            </strong>
            <div className="d-flex align-items-center ">
              <Button
                onClick={handleSubmit(handleSubmitCreateCourse)}
                success_btn
                rounded
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                className=" ms-3 fs-5"
              >
                Tạo mới
              </Button>
            </div>
          </div>
        }
      >
        <div className="container">
          <div className="mb-3">
            <InputField
              label="Tiêu đề"
              name="title"
              register={register}
              validation={{
                required: "Tiêu đề là bắt buộc",
                validate: {},
                maxLength: {
                  value: 254,
                  message: "Tiêu đề có tối đa 254 ký tự",
                },
              }}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toLowerCase()
                  .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
              }}
              placeholder="Nhập tiêu đề"
              leftIcon={<FontAwesomeIcon icon={faSignature} />}
              errors={errors}
            />
          </div>
          <div className="mb-3">
            <InputField
              label="Miêu tả"
              name="description"
              register={register}
              validation={{
                required: "Miêu tả không để trống",
                maxLength: {
                  value: 500,
                  message: "Miêu tả có tối đa 500 ký tự",
                },
              }}
              placeholder="Nhập Miêu tả"
              leftIcon={<FontAwesomeIcon icon={faQuoteLeft} />}
              errors={errors}
            />
          </div>
          <div className="">
            <div className="mb-3 row">
              <div className=" mb-3 col-sm-4 col-xs-12 mb-2 mb-md-0">
                <label
                  htmlFor="file"
                  className={`${styles.btn_changeThumbnail}`}
                >
                  Thêm bìa khóa học
                </label>
              </div>
              <div className="d-flex justify-content-around col-sm-8 col-xs-12">
                {thumbnail.image && (
                  <Image
                    course_img
                    src={thumbnail.image as string}
                    alt="Course Thumbnail"
                  />
                )}
              </div>
              <input
                id="file"
                type="file"
                accept="image/*"
                className="d-none"
                {...register("image", {
                  required: "Vui lòng viết thêm ảnh của khóa học",
                  onChange: onImageChange,
                })}
              />
              {errors.image && (
                <p className="text-danger">{errors.image.message}</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
