"use client";
import { useParams, useRouter } from "next/navigation";
import Card from "@/modules/common/components/Card";
import React, { Suspense, useEffect, useState } from "react";
import Button from "@/modules/common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import styles from "./ChiTiet.module.scss";
import Image from "@/modules/common/components/Image";
import SkeletonData from "@/modules/common/components/skeleton-data";
import formatDateTime from "@/common/format_date";
import { useToastContext } from "@/lib/context/toast-context";
import UserServices from "@/services/user-services";
const page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
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

  useEffect(() => {
    UserServices.GetUserById(params.id)
      .then((res) => {
        setUserData(res.user);
      })
      .catch((err) => {
        handleErrorToast("Đã xảy ra lỗi");
      });
  }, []);
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <div className={styles.wrapper}>
        {userData ? (
          <Card
            title={
              <div className="row align-items-center justify-content-between">
                <div className="col-sm-12 col-md-7 mt-2">
                  Thông tin tài khoản -
                  <strong className="ms-2 text-danger">{userData.email}</strong>
                </div>
                <div className="col-sm-12 col-md-5 row d-flex justify-content-end fs-5">
                  <div className="col-3 mt-2">
                    <Button
                      rounded
                      leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
                      className="text-nowrap w-100 justify-content-around"
                      transparent_btn
                      onClick={() => router.back()}
                    >
                      Quay lại
                    </Button>
                  </div>
                </div>
              </div>
            }
          >
            <div className={`${styles.body} m-2`}>
              <div className="">
                {/* Info */}
                <div className="row">
                  <div className=" col-md-6 col-lg-6">
                    {/* img */}
                    <div
                      className={`${styles.card_img_wrapper} rounded mb-2 w-100 mt-3`}
                    >
                      <div className={`shadow-sm w-100`}>
                        <Image
                          w100
                          alt="Ảnh thẻ"
                          src={process.env.FLIPBOOK_URL + "/" + userData.avatar}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 mt-3">
                    {/* Email */}
                    <div className={`row d-flex align-items-center mb-2`}>
                      <div className="col text-end">Email</div>
                      <div className="col d-flex">
                        <div className=" fw-bold">{userData.email} </div>
                      </div>
                    </div>
                    {/* Name */}
                    <div className={`row d-flex align-items-center mb-2`}>
                      <div className="col text-end">Họ và tên</div>
                      <div className="col d-flex">
                        <div className=" fw-bold">{userData.name} </div>
                      </div>
                    </div>
                    {/* created at */}
                    <div className={`row d-flex align-items-center mb-2`}>
                      <div className="col text-end">Ngày đăng ký</div>
                      <div className="col d-flex">
                        <div className=" fw-bold">
                          {formatDateTime.formatDate(userData.createdAt)}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <SkeletonData />
        )}
      </div>
    </Suspense>
  );
};

export default page;
