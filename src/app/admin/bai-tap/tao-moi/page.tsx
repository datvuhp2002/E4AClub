"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./TaoMoi.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "@/modules/common/components/Select";
import { exercisesType } from "@/common/static_variable";
import ExercisesServices from "@/services/exercises-services";

interface FormValues {
  type: string;
  question: string;
  fillQuestion?: string; // ✅ Thêm ô nhập câu hỏi điền từ khuyết thiếu
  options?: { text: string; isCorrect: boolean }[];
  correctAnswers?: string;
}

const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      type: "options",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { HandleOpenToast } = useToastContext();
  const [selectedType, setSelectedType] = useState<string>("options");

  const handleSuccessToast = (message: string) => {
    HandleOpenToast({ type: "success", content: message });
  };

  const handleErrorToast = (message: string) => {
    HandleOpenToast({ type: "error", content: `${message}! Vui lòng thử lại` });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await ExercisesServices.createExercise(data);
      if (res.success) {
        handleSuccessToast("Tạo bài tập thành công");
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
  };

  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div>
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">
            <Link href="/admin">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Chi tiết bài giảng</li>
          <li className="breadcrumb-item">Bài tập</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">Tạo mới</li>
        </ol>
      </div>
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <div className="mt-2 fw-bold">Tạo bài tập</div>
            <div className="d-flex mt-2">
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
          </div>
        }
      >
        <form>
          <div className="row">
            {/* Chọn loại bài tập */}
            <div className="col-12 col-md-6 mb-3">
              <label className="fw-bold">Loại bài tập (*)</label>
              <Select
                register={register}
                name="type"
                validation={{ required: "Loại bài tập là bắt buộc" }}
                errors={errors}
                onChange={handleTypeChange}
              >
                {exercisesType.map((item: any, index: number) => (
                  <option key={index} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-12 mb-3">
              <label className="fw-bold">Câu hỏi (*)</label>
              <input
                type="text"
                className="form-control"
                {...register("question", {
                  required: "Câu hỏi là bắt buộc",
                })}
              />
              {errors.question && (
                <small className="text-danger">{errors.question.message}</small>
              )}
            </div>

            {/* Nếu loại bài tập là trắc nghiệm (options) */}
            {selectedType === "options" && (
              <>
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
                      <input
                        type="checkbox"
                        {...register(`options.${index}.isCorrect` as const)}
                      />
                      <Button danger_btn onClick={() => remove(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    success_btn
                    onClick={(e) => {
                      e.preventDefault();
                      append({ text: "", isCorrect: false });
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Thêm đáp án
                  </Button>
                </div>
              </>
            )}

            {/* Nếu loại bài tập là điền từ khuyết thiếu (fill) */}
            {selectedType === "fill-in" && (
              <>
                <div className="col-12 mb-3">
                  <label className="fw-bold">Đáp án đúng (*)</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("correctAnswers", {
                      required: "Đáp án đúng là bắt buộc",
                    })}
                    placeholder="Ví dụ: Việt Nam"
                  />
                  {errors.correctAnswers && (
                    <small className="text-danger">
                      {errors.correctAnswers.message}
                    </small>
                  )}
                </div>
              </>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default page;
