"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./ChinhSua.module.scss";
import { Controller, useForm } from "react-hook-form";
import Card from "@/modules/common/components/Card";
import dynamic from "next/dynamic";
import CourseServices from "@/services/course-services";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import SectionServices from "@/services/section-services";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import SkeletonData from "@/modules/common/components/skeleton-data";
import { useRouter } from "next/navigation";
const CKEditorComponent = dynamic(
  () => import("@/modules/common/components/ck-editor"),
  { ssr: false }
);

const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ICreateCourse>();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { HandleOpenToast } = useToastContext();
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
  const [isLoading, setLoading] = useState(true);
  const handleSubmitFormUpdate = async (data: any) => {
    CourseServices.UpdateCourse(params.id, data)
      .then((res) => {
        if (res.success) {
          handleSuccessToast("Cập nhật thành công");
        } else {
          handleErrorToast("Cập nhật thất bại");
        }
      })
      .catch((e) => {
        console.error(e);
        handleErrorToast("Cập nhật thất bại");
      });
  };
  useEffect(() => {
    CourseServices.GetCourseById(params.id).then((res) => {
      setLoading(false);
      setValue("title", res.data.title);
      setValue("description", res.data.description);
    });
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item">Trang chủ</li>
          <li className="breadcrumb-item">Khóa học</li>
          <li className="breadcrumb-item">Chi tiết</li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Chỉnh sửa
          </li>
        </ol>
      </div>
      {/* Data Table */}
      {isLoading ? (
        <SkeletonData />
      ) : (
        <Card
          title={
            <div className="d-flex align-items-center justify-content-between">
              <div className=" fw-bold">Chỉnh sửa khóa học</div>
              <div className="d-flex">
                <Button
                  rounded
                  success_btn
                  leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                  className="text-nowrap w-100 justify-content-around fs-4"
                  onClick={handleSubmit(handleSubmitFormUpdate)}
                >
                  sửa
                </Button>
                <Button
                  rounded
                  leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
                  className="text-nowrap w-100 justify-content-around fs-5"
                  transparent_btn
                  onClick={() => router.back()}
                >
                  Quay lại
                </Button>
              </div>
            </div>
          }
        >
          <form>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <div className="mb-3">
                  <label className="form-label">Tiêu đề:</label>
                  <input
                    type="text"
                    className="form-control p-3 fs-5"
                    placeholder="Tiều đề bài giảng"
                    {...register("title", {
                      required: "Vui lòng nhập tiêu đề bài giảng",
                    })}
                  />
                  {errors.title && (
                    <p className="text-danger mt-2">
                      {String(errors.title?.message)}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div className="mb-3">
                  <label className="form-label">Miêu tả:</label>
                  <textarea
                    className="form-control p-3 fs-5"
                    placeholder="Miêu tả"
                    {...register("description", {
                      required: "Vui lòng nhập miêu tả khóa học",
                      maxLength: {
                        value: 500,
                        message: "Miêu tả có tối đa 500 ký tự",
                      },
                    })}
                  />
                  {errors.description && (
                    <p className="text-danger mt-2">
                      {String(errors.description?.message)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default page;
