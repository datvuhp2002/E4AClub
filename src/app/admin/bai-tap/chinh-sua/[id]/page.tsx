"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./ChinhSua.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "@/modules/common/components/Select";
import { exercisesType } from "@/common/static_variable";
import ExercisesServices from "@/services/exercises-services";
import { useParams, useRouter } from "next/navigation";

interface FormValues {
  sectionId: string;
  type: string;
  question: string;
  options?: { text: string; isCorrect: boolean }[];
  blankAnswer?: string;
  role?: string;
  script?: string;
  conversation?: { script?: string; role?: string };
}

const page = () => {
  const params = useParams<{ id: string }>();
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
  const [exerciseData, setExerciseData] = useState<ICreateExercise>();
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
    const payload: ICreateExercise = {
      _id: params.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sectionId: exerciseData?.sectionId ?? "",
      type: exerciseData?.type as
        | "multiple-choice"
        | "single-choice"
        | "fill-in-the-blank"
        | "speaking"
        | "conversation",
      question: data.question,
      options:
        data.options?.map((option) => ({
          text: option.text,
          isCorrect: option.isCorrect,
        })) ?? [],
      blankAnswer: data.blankAnswer ?? "",
      conversation: {
        role: data.role ?? "",
        script: data.script ?? "",
      },
    };
    if (data.type === "choice" && (!data.options || data.options.length < 2)) {
      handleErrorToast("Câu trả lời phải có ít nhất 2 đáp án");
      return;
    }
    if (
      exerciseData?.type !== "multiple-choice" &&
      exerciseData?.type !== "single-choice"
    ) {
      payload.options = [];
    }
    try {
      const res = await ExercisesServices.UpdateExercise(params.id, payload);
      if (res.success) {
        handleSuccessToast("Cập nhật bài tập thành công");
      } else {
        handleErrorToast("Cập nhật bài tập thất bại");
      }
    } catch (error) {
      console.error(error);
      handleErrorToast("Lỗi khi cập nhật bài tập");
    }
  };

  useEffect(() => {
    ExercisesServices.GetExerciseById(params.id).then((res) => {
      setExerciseData(res.exercise);
      setValue("question", res.exercise.question);
      if (
        res.exercise.type === "single-choice" ||
        res.exercise.type === "multiple-choice"
      ) {
        setSelectedType("choice");
        if (res.exercise.options) {
          setValue("options", res.exercise.options);
        }
      } else if (res.exercise.type === "fill-in-the-blank") {
        setSelectedType(res.exercise.type);
        setValue("blankAnswer", res.exercise.blankAnswer);
      } else if (res.exercise.type === "conversation") {
        setSelectedType(res.exercise.type);
        setValue("role", res.exercise.conversation.role);
        setValue("script", res.exercise.conversation.script);
      } else {
        setSelectedType(res.exercise.type);
      }
    });
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div>
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">Trang chủ</li>
          <li className="breadcrumb-item">Chi tiết bài giảng</li>
          <li className="breadcrumb-item">Bài tập</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">Tạo mới</li>
        </ol>
      </div>
      <Card
        title={
          <div className="d-flex align-items-center justify-content-between">
            <div className=" fw-bold">Tạo bài tập</div>
            <div className="d-flex  row align-items-center">
              <div className="d-flex ">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  rounded
                  success_btn
                  leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                  className="text-nowrap w-100 justify-content-around fs-5"
                >
                  sửa
                </Button>
                <Button
                  rounded
                  leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
                  className="text-nowrap w-100 justify-content-around fs-5"
                  transparent_btn
                  onClick={() =>
                    router.push(`/admin/bai-tap/chi-tiet/${params.id}`)
                  }
                >
                  Quay lại
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
                      router.push(`/admin/bai-giang/chi-tiet/${sectionParams}`)
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
            <div className="col-12 col-md-6 mb-3">
              <div className="col-12">
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
                        {...register(`options.${index}.text`, {
                          required: "Đáp án không được để trống",
                        })}
                        defaultValue={field.text} // Thêm giá trị mặc định
                      />
                      <div className="d-flex align-items-center">
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            {...register(`options.${index}.isCorrect`)}
                            defaultChecked={field.isCorrect} // Thêm giá trị mặc định
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
            {/* Nếu loại bài tập là phát âm  */}
            {selectedType === "conversation" && (
              <div className="col-12 col-md-6 mb-3">
                <div className="col-12 mb-3">
                  <label className="fw-bold">
                    Vai trò <span className="text-danger">(*)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("role", {
                      required: "Vai trò là bắt buộc",
                    })}
                  />
                  {errors.role && (
                    <small className="text-danger">{errors.role.message}</small>
                  )}
                </div>
                <div className="col-12 mb-3">
                  <label className="fw-bold">
                    Kịch bản <span className="text-danger">(*)</span>
                  </label>
                  <textarea
                    className="form-control fs-5"
                    style={{ minHeight: "30vh" }}
                    {...register("script", {
                      required: "Kịch bản là bắt buộc",
                    })}
                  />
                  {errors.script && (
                    <small className="text-danger">
                      {errors.script.message}
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
