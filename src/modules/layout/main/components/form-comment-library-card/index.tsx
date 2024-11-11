"use client";
import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./FormCommentLibraryCard.module.scss";
import SimpleCaptcha from "@/modules/common/components/Captcha";
import Button from "@/modules/common/components/Button";
import FeedbackLibraryServices from "@/services/feedback-library-services";
import { useToastContext } from "@/lib/context/toast-context";
import {
  renderAddress,
  renderContent,
  renderEmail,
  renderFullName,
  renderPhone,
  renderTitle,
} from "../render-fields";

interface FormValues {
  fullName: string;
  address: string;
  email: string;
  tel: string;
  title: string;
  content: string;
}
const FormCommentLibraryCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "all" });
  const { HandleOpenToast } = useToastContext();

  const handleSuccessToast = () => {
    HandleOpenToast({ type: "success", content: "Gửi góp ý thành công!" });
  };

  const handleErrorToast = (message: string) => {
    HandleOpenToast({
      type: "error",
      content: `${message}! Vui lòng thử lại.`,
    });
  };
  const captchaRef = useRef<any>(null);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    if (captchaRef.current && !captchaRef.current.validateCaptcha()) {
      handleErrorToast("Mã CAPTCHA không đúng");
      return;
    }
    FeedbackLibraryServices.Insert(data)
      .then((res) => {
        if (res) {
          console.log(res);
          handleSuccessToast();
        } else {
          handleErrorToast("Góp ý không thành công");
        }
      })
      .catch((e) => handleErrorToast("Có lỗi sảy ra"));
  };

  return (
    <div
      className={`${styles.wrapper} d-flex flex-column align-items-center p-4 `}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
        {/* Dynamic fields */}
        {renderFullName(register, errors)}

        {/* Address */}
        {renderAddress(register, errors, false)}

        {/* Email */}
        {renderEmail(register, errors, false)}

        {/* Phone */}
        {renderPhone(register, errors)}
        {/* title */}
        {renderTitle(register, errors)}
        {/* content */}
        {renderContent(register, errors)}
        {/* Captcha */}
        <div className={`${styles.form_item} row align-items-start mt-4`}>
          <label className="col-sm-4 col-xs-12">
            Mã xác thực
            <span className="ms-1 text-danger">(*)</span>
          </label>
          <div className="col-sm-8 col-xs-12">
            <SimpleCaptcha ref={captchaRef} />
          </div>
        </div>
        {/* Submit button */}
        <div
          className={`${styles.form_item} d-flex align-items-start mt-4 justify-content-end`}
        >
          <Button type="submit" rounded>
            Gửi
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormCommentLibraryCard;
