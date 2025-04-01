"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./TaoMoi.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "@/modules/common/components/Select";
import { exercisesType } from "@/common/static_variable";
import ExercisesServices from "@/services/exercises-services";
import { useRouter, useSearchParams } from "next/navigation";

interface FormValues {
  sectionId: string;
  type: string;
  question: string;
  fillQuestion?: string;
  options?: { text: string; isCorrect: boolean }[];
  blankAnswer?: string[];
}

const page = () => {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      type: "choice",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });
  const router = useRouter();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { HandleOpenToast } = useToastContext();
  const [selectedType, setSelectedType] = useState<string>("choice");
  const handleSuccessToast = (message: string) => {
    HandleOpenToast({ type: "success", content: message });
  };
  const [sectionParams, setSectionParams] = useState<string>();
  const handleErrorToast = (message: string) => {
    HandleOpenToast({ type: "error", content: `${message}! Vui lòng thử lại` });
  };
  const resetFormValues = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      if (key !== "type" && key != "sectionId") {
        setValue(key as keyof FormValues, "");
      }
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof FormValues);
    });
  };
  const onSubmit = async (data: FormValues) => {
    let payload = { ...data };
    if (data.type !== "choice") {
      delete payload.options;
    } else {
      if (!data.options || data.options.length < 2) {
        handleErrorToast("Câu trả lời phải có ít nhất 2 đáp án");
        return;
      }
    }
    try {
      const res = await ExercisesServices.CreateExercise(payload);
      if (res.success) {
        handleSuccessToast("Tạo bài tập thành công");
        resetFormValues();
      } else {
        handleErrorToast("Tạo bài tập thất bại");
      }
    } catch (error) {
      console.error(error);
      handleErrorToast("Lỗi khi tạo bài tập");
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setValue("type", newType);
    resetFormValues();
  };

  useEffect(() => {
    const searchParam = searchParams.get("learning");
    if (searchParam) {
      setSectionParams(searchParam?.toString());
      setValue("sectionId", searchParam?.toString());
    }
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div>
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">Chi tiết bài giảng</li>
          <li className="breadcrumb-item">Bài tập</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">Tạo mới</li>
        </ol>
      </div>
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <div className="mt-2 fw-bold">Tạo bài tập</div>
            <div className="d-flex mt-2 row align-items-center">
              <div className="col ">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  rounded
                  success_btn
                  leftIcon={<FontAwesomeIcon icon={faPlus} />}
                  className="text-nowrap w-100 justify-content-around fs-5"
                >
                  Tạo mới
                </Button>
              </div>
              {sectionParams && (
                <div className="col ">
                  <Button
                    rounded
                    leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
                    className="text-nowrap w-100 justify-content-around fs-5"
                    transparent_btn
                    onClick={() =>
                      router.push(
                        `/teacher/bai-giang/chi-tiet/${sectionParams}`
                      )
                    }
                  >
                    Quay lại
                  </Button>
                </div>
              )}
            </div>
          </div>
        }
      >
        <form>
          <div className="row">
            {/* Chọn loại bài tập */}
            <div className="col-12 col-md-6 mb-3">
              <label className="fw-bold">
                Loại bài tập <span className="text-danger">(*)</span>
              </label>
              {exercisesType && (
                <Select
                  register={register}
                  name="type"
                  validation={{ required: "Loại bài tập là bắt buộc" }}
                  errors={errors}
                  onChange={handleTypeChange}
                >
                  {exercisesType.length > 0 ? (
                    exercisesType.map((item: any, index: number) => (
                      <option key={index} value={item.value}>
                        {item.title}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              )}
              <div className="col-12 my-3">
                <label className="fw-bold">
                  Câu hỏi <span className="text-danger">(*)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("question", {
                    required: "Câu hỏi là bắt buộc",
                  })}
                />
                {errors.question && (
                  <small className="text-danger">
                    {errors.question.message}
                  </small>
                )}
              </div>
            </div>

            {/* Nếu loại bài tập là trắc nghiệm (choice) */}
            {selectedType === "choice" && (
              <div className="col-12 col-md-6 mb-3">
                <div className="col-12 mb-3">
                  <label className="fw-bold">Đáp án</label>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="d-flex align-items-center mb-2"
                    >
                      <input
                        type="text"
                        className="form-control me-2"
                        {...register(`options.${index}.text` as const, {
                          required: "Đáp án không được để trống",
                        })}
                      />
                      <div className="d-flex align-items-center ">
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            {...register(`options.${index}.isCorrect` as const)}
                          />
                        </div>
                        <Button
                          rounded
                          danger_btn
                          onClick={() => remove(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>

                      {/* Hiển thị lỗi nếu có */}
                      {errors.options?.[index]?.isCorrect && (
                        <small className="text-danger">
                          {errors.options[index]?.isCorrect?.message}
                        </small>
                      )}
                    </div>
                  ))}
                  <Button
                    success_btn
                    className="rounded-1"
                    onClick={(e) => {
                      e.preventDefault();
                      append({ text: "", isCorrect: false });
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Thêm đáp án
                  </Button>
                </div>
              </div>
            )}

            {/* Nếu loại bài tập là điền từ khuyết thiếu (fill) */}
            {selectedType === "fill-in-the-blank" && (
              <div className="col-12 col-md-6 mb-3">
                <div className="col-12 mb-3">
                  <label className="fw-bold">
                    Từ khuyết thiếu <span className="text-danger">(*)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("blankAnswer", {
                      required: "Từ khuyết thiếu là bắt buộc",
                    })}
                  />
                  {errors.blankAnswer && (
                    <small className="text-danger">
                      {errors.blankAnswer.message}
                    </small>
                  )}
                </div>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default page;
