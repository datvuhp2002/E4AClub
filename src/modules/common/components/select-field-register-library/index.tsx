import React from "react";
import Select from "@/modules/common/components/Select";
import styles from "./SelectField.module.scss";

interface SelectFieldProps {
  label: string;
  name: string;
  register: any; // Điều chỉnh kiểu dữ liệu cho register nếu có
  validation?: any; // Có thể là một đối tượng các quy tắc xác thực
  leftIcon?: React.ReactNode; // Icon bên trái nếu cần
  data: { value: string; title: string }[]; // Dữ liệu cho các tùy chọn
  errors: any; // Điều chỉnh kiểu dữ liệu cho errors nếu có
  default_value?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  register,
  validation,
  leftIcon,
  data,
  errors,
  default_value,
}) => {
  var selected = "";

  return (
    <div className={`${styles.form_item} row align-items-center`}>
      <label className="col-sm-4 col-xs-12">
        {label}
        <span className="ms-1 text-danger">(*)</span>
      </label>
      <div className="col-sm-8 col-xs-12">
        <Select
          register={register}
          name={name}
          validation={validation}
          leftIcon={leftIcon}
          errors={errors}
        >
          {default_value ? (
            <option hidden value={default_value.value}>
              {default_value.title}
            </option>
          ) : (
            <option hidden value="">
              Chọn {selected}
            </option>
          )}
          {data.map((item, index) => (
            <option key={index} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
        {errors[name] && (
          <small className="text-danger">{errors[name].message}</small>
        )}
      </div>
    </div>
  );
};

export default SelectField;
