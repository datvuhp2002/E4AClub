"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./TaoMoi.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import { useToastContext } from "@/lib/context/toast-context";
import formatDateTime from "@/common/format_date";
import InputField from "@/modules/common/components/input-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEnvelope,
  faPersonCircleQuestion,
  faQuoteLeft,
  faSignature,
  faSpinner,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import UserServices from "@/services/user-services";
import CourseServices from "@/services/course-services";

const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<ICreateCourse>();
  const { HandleOpenToast } = useToastContext();
  const [onLoading, setOnLoading] = useState<boolean>(false);
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
  const resetFormValues = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      setValue(key as keyof ICreateCourse, "");
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof ICreateCourse);
    });
  };
  const handleSubmitCreateUser: SubmitHandler<ICreateCourse> = async (data) => {
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
                onClick={handleSubmit(handleSubmitCreateUser)}
                success_btn
                leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                className="btn ms-3 fs-5"
              >
                Tạo
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
                validate: {
                  twoWords: (value: string) =>
                    value.trim().split(" ").length >= 2 ||
                    "Tiêu đề phải có ít nhất 2 từ",
                },
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
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Miêu tả không hợp lệ",
                },
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
        </div>
      </Card>
    </div>
  );
};

export default page;
