"use client";
import React, { useState } from "react";
import styles from "./QuenMatKhau.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import InputField from "@/modules/common/components/input-field";
import Button from "@/modules/common/components/Button";
import { useRouter } from "next/navigation";
import { useToastContext } from "@/lib/context/toast-context";
import AuthServices from "@/services/auth-services";
import Link from "next/link";

const page = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const { HandleOpenToast } = useToastContext();
  const handleSuccessToast = (message: string) => {
    HandleOpenToast({ type: "success", content: message });
  };

  const handleErrorToast = (message: string) => {
    HandleOpenToast({
      type: "error",
      content: `${message}! Vui lòng thử lại.`,
    });
  };
  const router = useRouter();
  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (
    data: ForgotPasswordFormInputs
  ) => {
    const res = await AuthServices.RequestPasswordReset(data);
    if (!res) {
      handleErrorToast("Đã sảy ra lỗi");
    } else if (res.success) {
      handleSuccessToast("Đã gửi mã đến email!");
      setOpenOtp(true);
    } else {
      handleErrorToast("Đã sảy ra lỗi");
    }
  };
  const onSubmitChangePassword: SubmitHandler<
    ForgotPasswordFormInputs
  > = async (data: ForgotPasswordFormInputs) => {
    const res = await AuthServices.ResetPassword(data);
    if (!res) {
      handleErrorToast("Đã sảy ra lỗi");
    } else if (res.success) {
      handleSuccessToast(
        "Đổi mật khẩu thành công, hãy kiểm tra mật khẩu mới trong email!"
      );
      setValue("email", "");
      setValue("otp", "");
      setOpenOtp(true);
    } else {
      handleErrorToast("Đã sảy ra lỗi");
    }
  };
  return (
    <div className={`${styles.wrapper} border-4 rounded-4 p-5 shadow-sm`}>
      <div className={`${styles.form_wrapper}`}>
        <div className={`${styles.form_title}`}>
          <h3 className={`${styles.main_title} fw-bold`}>Đăng nhập</h3>
          <p className={`${styles.sub_title}  mt-1`}>Phần mềm học ngoại ngữ</p>
        </div>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
          className={styles.form}
        >
          {/* username */}
          <div className="w-100">
            <label htmlFor="email" className="fw-bold mb-2">
              Email
            </label>
            <p className={`${styles.sub_title}  mt-1 text-start fs-5`}>
              <i>Nhập email mà bạn dùng để đăng ký tài khoản để tiếp tục</i>
            </p>
            <InputField
              login_temp
              id="email"
              name="email"
              required={false}
              register={register}
              validation={{
                required: "Email không được để trống",
              }}
              placeholder="Email"
              errors={errors}
            />
          </div>
          {!openOtp && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-100 rounded-1 mt-2 border-0"
              login_btn
            >
              Tiếp tục
            </Button>
          )}
        </Box>
        {openOtp && (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitChangePassword)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
            className={styles.form}
          >
            {/* username */}
            <div className="w-100 mt-3">
              <label htmlFor="otp" className="fw-bold mb-2">
                Otp
              </label>
              <p className={`${styles.sub_title}  mt-1 text-start fs-5`}>
                <i>Nhập mã Otp đã gửi đến email để đổi mật khẩu</i>
              </p>
              <InputField
                login_temp
                id="otp"
                name="otp"
                required={false}
                register={register}
                validation={{
                  required: "Otp không được để trống",
                }}
                placeholder="Otp"
                errors={errors}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-100 rounded-1 mt-2 border-0"
              login_btn
            >
              Xác nhận
            </Button>
          </Box>
        )}
      </div>
      <div className={`${styles.form_title}`}>
        <p className={`${styles.sub_title} fs-5  mt-4 text-end text-link`}>
          <Link href={`/auth/login`}>
            <i>Quay lại đăng nhập</i>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
