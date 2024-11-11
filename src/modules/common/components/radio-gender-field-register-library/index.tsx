import React from "react";
import styles from "./RadioField.module.scss";

interface RadioFieldProps {
  label: string;
  register: any;
  errors: any;
}

const RadioField: React.FC<RadioFieldProps> = ({ label, register, errors }) => (
  <div className={`${styles.form_item} row align-items-center`}>
    <label className="col-sm-4 col-xs-12">
      {label}
      <span className="ms-1 text-danger">(*)</span>
    </label>
    <div className="col-sm-8 col-xs-12">
      <div>
        <span className="form-check-label">
          <input
            type="radio"
            className="form-check-input me-2"
            {...register("gender", { required: "Giới tính là bắt buộc" })}
            value="male"
            id="male"
            checked="checked"
          />
          <label className=" fw-normal" htmlFor="male">
            Nam
          </label>
        </span>
        <span className="form-check-label ms-4">
          <input
            type="radio"
            className="form-check-input me-2"
            {...register("gender", { required: "Giới tính là bắt buộc" })}
            value="female"
            id="female"
          />
          <label className=" fw-normal" htmlFor="female">
            Nữ
          </label>
        </span>
      </div>
      {errors.gender && (
        <small className="text-danger">{errors.gender.message}</small>
      )}
    </div>
  </div>
);

export default RadioField;
