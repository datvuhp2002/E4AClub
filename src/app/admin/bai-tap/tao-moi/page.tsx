"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./TaoMoi.module.scss";
import { Controller, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import { Autocomplete, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import CourseServices from "@/services/course-services";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import SectionServices from "@/services/section-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTableList } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Select from "@/modules/common/components/Select";
import { exercisesType } from "@/common/static_variable";

const CKEditorComponent = dynamic(
  () => import("@/modules/common/components/ck-editor"),
  { ssr: false }
);
interface FormValues {
  type: String;
}
const page = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ mode: "all" });
  const { HandleOpenToast } = useToastContext();
  const searchParams = useSearchParams();
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
  const [sectionParams, setSectionParams] = useState<string>("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [hasCourse, setHasCourse] = useState(false);
  const [type, setType] = useState<any>(exercisesType);
  const [cardObjectTypeChange, setCardObjectTypeChange] = useState<any>([]);
  const [cardObjectType, setCardObjectType] = useState<any>([]);

  const handleSubmitFormUrlAdd = async (data: any) => {
    if (sectionParams) {
      data.courseId = sectionParams;
    }
    SectionServices.AddSection(data)
      .then((res) => {
        if (res.success) {
          handleSuccessToast("Tạo thành công");
        } else {
          handleErrorToast("Tạo thất bại");
        }
      })
      .catch((e) => {
        console.error(e);
        handleErrorToast("Tạo thất bại");
      });
  };
  const resetFormValues = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      if (key !== "type" && key !== "nation" && key !== "gender") {
        setValue(key as keyof FormValues, "");
      }
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof FormValues);
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "type") {
      const selectedOption = type.find((option: any) => option.value === value);
      if (selectedOption) {
        setValue("type", value.toString());
      }
    }
    resetFormValues();
  };
  useEffect(() => {
    const searchParamsCourse = searchParams.get("learning");
    if (searchParamsCourse) {
      setSectionParams(searchParamsCourse);
    }
    CourseServices.GetAllCourse()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((errors) => {
        console.error(errors);
      });
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Chi tiết bài giảng</li>
          <li className="breadcrumb-item">Bài tập</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">Tạo mới</li>
        </ol>
      </div>
      {/* Data Table */}
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <div className=" mt-2 fw-bold">Tạo bài tập</div>
            <div className="d-flex mt-2">
              <Button
                onClick={handleSubmit(handleSubmitFormUrlAdd)}
                rounded
                success_btn
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                className="text-nowrap w-100 justify-content-around fs-5"
              >
                Tạo mới
              </Button>
            </div>
          </div>
        }
      >
        <form>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              {!sectionParams && (
                <div className="mb-3 ">
                  <label className="form-label">Bài giảng:</label>
                  {/* <Controller
                    name="courseId"
                    control={control}
                    rules={{ required: "Vui lòng chọn Bài giảng" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        value={selectedCourse}
                        options={courses}
                        getOptionLabel={(option) =>
                          `${option.title} - ${option._id}`
                        }
                        isOptionEqualToValue={(option: any, value: any) =>
                          option._id === value._id
                        }
                        onChange={(event, value) => {
                          field.onChange(value ? value._id : null);
                          setSelectedCourse(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Bài giảng"
                            error={!!errors._id}
                            helperText={
                              errors._id?.message
                                ? String(errors._id.message)
                                : ""
                            }
                            InputProps={{
                              ...params.InputProps,
                              readOnly: hasCourse,
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  {errors.courseId && (
                    <p className="text-danger mt-2">
                      {String(errors.courseId?.message)}
                    </p>
                  )} */}
                </div>
              )}
              <div className="mb-3 ">
                <label className="form-label">Bài giảng:</label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className={`${styles.form_item} row align-items-center`}>
                <label className="col-sm-4 col-xs-12 mb-2 mb-md-0">
                  Loại thẻ<span className="text-danger ms-1">(*)</span>
                </label>
                <div className="col-sm-8 col-xs-12">
                  <Select
                    register={register}
                    name="type"
                    validation={{ required: "Loại thẻ là bắt buộc" }}
                    onChange={handleChange}
                    leftIcon={<FontAwesomeIcon icon={faTableList} />}
                    errors={errors}
                  >
                    {type &&
                      type.map((item: any, index: string) => (
                        <option key={index} value={item.value}>
                          {item.title}
                        </option>
                      ))}
                  </Select>
                  {errors.type && (
                    <small className="text-danger">{errors.type.message}</small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default page;
