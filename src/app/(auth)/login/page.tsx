"use client";
import React from "react";
import styles from "./RegisterLibrary.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import InputField from "@/modules/common/components/input-field-register-library";
import Link from "next/link";
import Button from "@/modules/common/components/Button";
import { useRouter } from "next/navigation";
interface LoginFormInputs {
  username: string;
  password: string;
}
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const router = useRouter();
  const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    router.push("/admin");
  };
  return (
    <div className={`${styles.wrapper} border-4 rounded-4 p-5 shadow-sm`}>
      <div className={`${styles.form_wrapper}`}>
        <div className={`${styles.form_title}`}>
          <h3 className={`${styles.main_title} fw-bold`}>Đăng nhập</h3>
          <p className={`${styles.sub_title}  mt-2`}>
            Phần mềm Thư viện số và Tri thức bLib 8.5
          </p>
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
            <label htmlFor="username" className="fw-bold mb-2">
              Tên đăng nhập
            </label>
            <InputField
              login_temp
              id="username"
              name="username"
              required={false}
              register={register}
              validation={{
                required: "Tên đăng nhập không được để trống",
              }}
              placeholder="Tên đăng nhập"
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
    </div>
  );
};

export default page;
