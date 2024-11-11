import React from "react";
import classNames from "classnames/bind";
import Styles from "./Input.module.scss";
import { FieldValues, UseFormRegister } from "react-hook-form";

const cx = classNames.bind(Styles);

interface InputProps {
  type?: string;
  className?: string; // Class cho các trạng thái error/success
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  register?: UseFormRegister<FieldValues>;
  name: string;
  validation?: object;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurWrapp?: (e: React.FocusEvent<HTMLInputElement>) => void;
  success?: boolean;
  cropper?: boolean;
  admin_temp?: boolean;
  login_temp?: boolean;
  admin_temp_research?: boolean;
  errors?: any; // Thêm props để nhận lỗi từ InputField
  [key: string]: any; // Cho phép các props bổ sung
}

const Input: React.FC<InputProps> = ({
  type = "text",
  className,
  leftIcon,
  rightIcon,
  register,
  name,
  validation,
  onChange,
  onBlur,
  cropper,
  admin_temp,
  admin_temp_research,
  login_temp,
  errors, // Nhận props errors
  ...passProps
}) => {
  const Comp: React.ElementType = "input"; // Loại phần tử là input
  const inputProps = {
    type,
    onChange,
    onBlur, // Sử dụng hàm handleBlur mới
    ...passProps,
  };

  const registerProps = register ? register(name, validation) : {};
  const hasError = errors && errors[name];
  // const hasSuccess = errors && !hasError;
  const classes = cx("wrapper", {
    error: hasError,
    admin_temp,
    login_temp,
    admin_temp_research,
    cropper,
    [className as string]: className,
  });

  return (
    <div className={classes}>
      {leftIcon && <span className={cx("Icon")}>{leftIcon}</span>}
      <Comp {...inputProps} {...registerProps} />
      {rightIcon && <span className={cx("Icon")}>{rightIcon}</span>}
    </div>
  );
};

export default Input;
