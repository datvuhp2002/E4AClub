"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./TaoMoi.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import { useToastContext } from "@/lib/context/toast-context";
import ExcelUploader from "@/modules/common/components/excel-uploader";
import InputField from "@/modules/common/components/input-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPersonCircleQuestion,
  faPlus,
  faSpinner,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import UserServices from "@/services/user-services";
import SelectField from "@/modules/common/components/select-field-register-library";
import { role } from "@/common/static_variable";
interface CreateUserForm {
  email: string;
  name: string;
}
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
  } = useForm<ICreateUserDto>();
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
  const resetFormValues = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      setValue(key as keyof CreateUserForm, "");
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof CreateUserForm);
    });
  };
  const handleSubmitCreateUser: SubmitHandler<ICreateUserDto> = async (
    data
  ) => {
    setOnLoading(true);
    try {
      const result = await UserServices.CreateUser(data);
      if (result && result.success) {
        setOnLoading(false);

        handleSuccessToast("Tạo người dùng thành công");
      } else {
        setOnLoading(false);
        handleErrorToast("Tạo người dùng thất bại");
      }
    } catch (err) {
      console.error(err);
      setOnLoading(false);
      handleErrorToast("Tạo người dùng thất bại");
    }
    resetFormValues();
  };
  useEffect(() => {}, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">Tài khoản</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">Tạo mới</li>
        </ol>
      </div>
      {/* Data Table */}
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <strong>
              Tạo tài khoản{" "}
              {onLoading && (
                <FontAwesomeIcon icon={faSpinner} spin className="fs-2 ms-2" />
              )}
            </strong>
            <div className="d-flex align-items-center ">
              <ExcelUploader />
              <Button
                onClick={handleSubmit(handleSubmitCreateUser)}
                success_btn
                rounded
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                className="ms-3 fs-5"
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
              label="Họ và tên"
              name="name"
              register={register}
              validation={{
                required: "Họ và tên là bắt buộc",
                maxLength: {
                  value: 254,
                  message: "Họ và tên có tối đa 254 ký tự",
                },
              }}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toLowerCase()
                  .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
              }}
              placeholder="Họ và tên"
              leftIcon={<FontAwesomeIcon icon={faUser} />}
              errors={errors}
            />
          </div>

          <div className="mb-3">
            <SelectField
              label="Chức vụ"
              name="role"
              leftIcon={<FontAwesomeIcon icon={faPersonCircleQuestion} />}
              validation={{
                required: "Chức vụ là bắt buộc",
              }}
              register={register}
              data={role}
              errors={errors}
            />
          </div>
          <div className="mb-3">
            <InputField
              label="Email"
              name="email"
              register={register}
              validation={{
                required: "Email không để trống",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
                maxLength: {
                  value: 254,
                  message: "Email có tối đa 254 ký tự",
                },
              }}
              placeholder="Nhập email"
              leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
              errors={errors}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
