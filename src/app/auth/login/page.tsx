"use client";
import React, { useEffect } from "react";
import styles from "./Login.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import InputField from "@/modules/common/components/input-field";
import Button from "@/modules/common/components/Button";
import { useRouter } from "next/navigation";
import { useToastContext } from "@/lib/context/toast-context";
import AuthServices from "@/services/auth-services";
import Link from "next/link";
import Cookies from "js-cookie";
interface LoginFormInputs {
  email: string;
  password: string;
}
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
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
  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    const res = await AuthServices.Login(data);
    if (!res) {
      handleErrorToast("Login failed");
    } else {
      switch (res.data.user.role) {
        case "admin":
          window.open("/admin/khoa-hoc/danh-sach", "_blank"); // Mở tab mới cho admin
          break;
        case "teacher":
          window.open("/teacher/khoa-hoc/danh-sach", "_blank"); // Mở tab mới cho teacher
          break;
        case "student":
          router.push("/");
          break;
        default:
          router.push("/"); // Chuyển trang mặc định
          break;
      }
      router.push("/");
    }
  };
  useEffect(() => {
    if (Cookies.get("access_token")) {
      handleErrorToast("Không thể truy cập vào lúc này");
      return router.push("/");
    }
  }, []);
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
          {/* password */}
          <div className="w-100 mt-3">
            <div className="d-flex justify-content-between  mb-2">
              <label htmlFor="password" className="fw-bold">
                Mật khẩu
              </label>
              {/* <Link href="#" className={styles.forgot_password}>
                Quên mật khẩu?
              </Link> */}
            </div>
            <InputField
              login_temp
              type="password"
              id="password"
              required={false}
              name="password"
              register={register}
              validation={{
                required: "Mật khẩu không được để trống",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              }}
              placeholder="Mật khẩu"
              errors={errors}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-100 rounded-1 mt-2"
            login_btn
          >
            Đăng nhập
          </Button>
        </Box>
      </div>
      <div className={`${styles.form_title}`}>
        <p className={`${styles.sub_title} fs-5  mt-4 text-end text-link`}>
          <Link href={`/auth/quen-mat-khau`}>
            <i>Quên mật khẩu?</i>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
