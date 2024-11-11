import React from "react";
import styles from "./TextareaField.module.scss"; // Nhớ import CSS modules nếu cần

interface TextareaFieldProps {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  validation?: any;
  placeholder?: string;
  errors: any;
}

const TextareaField: React.FC<TextareaFieldProps> = React.memo(
  ({
    label,
    name,
    register,
    required = true,
    validation,
    placeholder,
    errors,
  }) => {
    return (
      <div className={`${styles.form_item} row align-items-center`}>
        <label className="col-sm-4 col-xs-12">
          {label}
          {required && <span className="ms-1 text-danger">(*)</span>}
        </label>
        <div className="col-sm-8 col-xs-12">
          {/* Sử dụng textarea thay vì Input */}
          <textarea
            className={`${styles.textarea} form-control`}
            placeholder={placeholder}
            {...register(name, validation)}
          />
          {errors[name] && ( // Hiển thị thông báo lỗi nếu có
            <small className="text-danger">{errors[name]?.message}</small>
          )}
        </div>
      </div>
    );
  }
);

export default TextareaField;
