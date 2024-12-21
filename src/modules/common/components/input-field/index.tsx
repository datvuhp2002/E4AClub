import React, { useState } from "react";
import styles from "./InputField.module.scss"; // Nhớ import CSS modules nếu cần
import Input from "../Input";

interface InputFieldProps {
  label?: string;
  name: string;
  register: any;
  required?: boolean;
  validation?: any;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  errors: any;
  type?: string;
  text_end?: boolean;
  admin_temp?: boolean;
  admin_temp_research?: boolean;
  login_temp?: boolean;
  id?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  required = true,
  validation,
  placeholder,
  leftIcon,
  errors,
  type = "text",
  text_end = false,
  admin_temp = false,
  login_temp,
  admin_temp_research,
  id,
  onInput,
}) => {
  return (
    <div
      className={`${styles.form_item} row align-items-center ${label ? "" : "mt-0"}`}
    >
      {label && (
        <label
          className={`col-sm-4 col-xs-12 mb-2 mb-md-0 ${text_end ? "text-end" : "text-start"}`}
        >
          {label}
          {required && <span className={`ms-1 text-danger`}>(*)</span>}
        </label>
      )}
      <div className={label ? `col-sm-8 col-xs-12` : "col align-items-center"}>
        <Input
          admin_temp={admin_temp}
          admin_temp_research={admin_temp_research}
          type={type}
          login_temp={login_temp}
          name={name}
          register={register}
          validation={validation}
          placeholder={placeholder}
          leftIcon={leftIcon}
          errors={errors}
          onInput={onInput}
          id={id}
        />
        {errors[name] && (
          <small className="text-danger">{errors[name]?.message}</small>
        )}
      </div>
    </div>
  );
};

export default InputField;
