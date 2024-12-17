"use client";
import { useParams, useRouter } from "next/navigation";
import Card from "@/modules/common/components/Card";
import React, { Suspense, useEffect, useState } from "react";
import Button from "@/modules/common/components/Button";
import styles from "./ChiTiet.module.scss";
import Image from "@/modules/common/components/Image";
import SkeletonData from "@/modules/common/components/skeleton-data";
import { useToastContext } from "@/lib/context/toast-context";
import SectionServices from "@/services/section-services";
import dynamic from "next/dynamic";
import { Autocomplete } from "@mui/material";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faLeftLong,
  faPenToSquare,
  faUserCheck,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
const CKEditorComponent = dynamic(
  () => import("@/modules/common/components/ck-editor"),
  { ssr: false }
);
const page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [sectionData, setSectionData] = useState<ISection>({} as ISection);
  const { HandleOpenToast } = useToastContext();
  const youtubeParser = (url: string) => {
    if (!url) return false;
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

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
    SectionServices.GetSection(params.id)
      .then((res) => {
        console.log(res.section);
        setSectionData(res.section);
      })
      .catch((err) => {
        handleErrorToast("Đã xảy ra lỗi");
      });
  }, []);
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <div className={styles.wrapper}>
        {sectionData ? (
          <div className={`${styles.wrapper} mb-5`}>
            <div className="">
              <ol className="breadcrumb mb-3">
                <li className="breadcrumb-item">
                  <Link href="/admin">Trang chủ</Link>
                </li>
                <li className="breadcrumb-item">Bài giảng</li>
                <li className="breadcrumb-item breadcrumb-active fw-bold">
                  Chi tiết
                </li>
              </ol>
            </div>
            {/* Data Table */}
            <Card
              title={
                <div className="row align-items-center justify-content-between">
                  <div className="col-sm-12 col-md-9 mt-2">
                    Chi tiết bài giảng -
                    <strong className="ms-2 text-danger">
                      {sectionData.title}
                    </strong>
                  </div>
                  <div className="col-sm-12 col-md-3 row d-flex fs-5">
                    <div className="col mt-2">
                      <Button
                        rounded
                        success_btn
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        className="text-nowrap w-100 justify-content-around fs-4"
                        // onClick={() => handleOnUpdateStatus("2")}
                        to={`/admin/bai-giang/chinh-sua/${params.id}`}
                      >
                        sửa
                      </Button>
                    </div>
                    <div className="col mt-2">
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
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <div className="mb-3 ">
                    <label className="form-label">Khóa học:</label>
                    <div>
                      <strong>{sectionData.course}</strong>
                    </div>
                  </div>
                  <div className="mb-3 ">
                    <label className="form-label">
                      Bài số:
                      <strong className="ms-2">{sectionData.order}</strong>
                    </label>
                    <div></div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tiêu đề:</label>
                    <div>
                      <strong className="fs-4">{sectionData.title}</strong>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">YouTube Video:</label>
                  </div>
                  <div className={`${styles.video_thumbnail}`}>
                    <div className="mb-3 w-100 h-100">
                      <div className="w-100 h-100">
                        <iframe
                          className={`${styles.video_preview} w-100`}
                          src={`https://www.youtube.com/embed/${sectionData.video}`}
                          allowFullScreen
                          title="YouTube video preview"
                          style={{
                            height: "calc(30vh + 10rem)",
                          }}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label">Nội dung:</label>
                  </div>
                  <div className={`${styles.video_thumbnail}`}>
                    <div className="mb-3 w-100 h-100">
                      <div className="w-100 h-100">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: sectionData.content,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <SkeletonData />
        )}
      </div>
    </Suspense>
  );
};

export default page;
