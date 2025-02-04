"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./ChiTiet.module.scss";
import Card from "@/modules/common/components/Card";
import TableSkeleton from "@/modules/common/components/table-skeleton";
import dynamic from "next/dynamic";
import CourseServices from "@/services/course-services";
import SectionServices from "@/services/section-services";
import Image from "@/modules/common/components/Image";
import moment from "moment";
import "moment/locale/vi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/modules/common/components/Button";
import {
  faLeftLong,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
const DataTable = dynamic(
  () => import("@/modules/common/components/data-table"),
  { ssr: false }
);

const selectedColumnSections = [
  { title: "Tập", data: "order" },
  { title: "Tiêu đề", data: "title" },
];
const selectedColumnEnrollUser = [
  { title: "Email", data: "email" },
  { title: "Họ và tên", data: "name" },
];
const page = () => {
  const router = useRouter();

  moment.locale("vi");
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<ICourse>({} as ICourse);
  const [enrollUser, setEnrollUser] = useState<ICourse>({} as ICourse);
  const [sections, setSections] = useState<ICourse>({} as ICourse);

  const [List, setList] = useState<any>();
  const [onLoading, setOnLoading] = useState<boolean>(true);
  const [onLoadingEnrollUser, setOnLoadingEnrollUser] = useState<boolean>(true);
  useEffect(() => {
    setOnLoading(true);
    setOnLoadingEnrollUser(true);
    CourseServices.GetCourseById(params.id).then((res) => {
      setCourse(res.data);
      setOnLoading(false);
    });
    SectionServices.GetSectionFromCourse(params.id)
      .then((res) => {
        setSections(res.sections);
      })
      .catch((err) => {
        console.log(err);
      });
    CourseServices.GetEnrolledUsers(params.id)
      .then((res) => {
        console.log(res);
        setEnrollUser(res.enrolledUsers);
        setOnLoadingEnrollUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={`${styles.wrapper} mb-5`}>
      <div className="d-flex align-items-center justify-content-between">
        <ol className="breadcrumb mb-3 ">
          <li className="breadcrumb-item">
            <Link href="/teacher">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">Khóa học</li>
          <li className="breadcrumb-item">
            <Link href="/teacher/khoa-hoc/danh-sach">Danh sách</Link>
          </li>
          <li className="breadcrumb-item breadcrumb-active fw-bold">
            Chi tiết
          </li>
        </ol>
        <div className="d-flex align-items-center justify-content-between">
          <div className=" d-flex fs-5">
            <Button
              rounded
              success_btn
              leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
              className="text-nowrap w-100 justify-content-around fs-4"
              to={`/teacher/khoa-hoc/chinh-sua/${params.id}`}
            >
              Cập nhật
            </Button>
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
      <div>
        <div className="my-3">
          <Card
            title={
              <label className="form-label fw-bold fs-3 ">
                Thông tin khóa học
              </label>
            }
          >
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
                        alt="Ảnh khóa học"
                        src={process.env.FLIPBOOK_URL + "/" + course.image}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 mt-3">
                  {/* tiêu đề */}
                  <div className={`row d-flex align-items-center mb-2`}>
                    <div className="col text-end">Tiêu đề</div>
                    <div className="col d-flex">
                      <div className=" fw-bold">{course.title} </div>
                    </div>
                  </div>
                  {/* miêu tả */}
                  <div className={`row d-flex align-items-center mb-2`}>
                    <div className="col text-end">Miêu tả</div>
                    <div className="col d-flex">
                      <span className="fw-bold">{course.description} </span>
                    </div>
                  </div>
                  {/* Giáo viên */}
                  {course.teacher && (
                    <div className={`row d-flex align-items-center mb-2`}>
                      <div className="col text-end">Giáo viên</div>
                      <div className="col d-flex">
                        <div className=" fw-bold ">
                          <Link
                            className="text-link"
                            href={`/teacher/tai-khoan/chi-tiet/${course.teacher._id}`}
                          >
                            {course.teacher.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* ngày tạo */}
                  <div className={`row d-flex align-items-center mb-2`}>
                    <div className="col text-end">Ngày tạo</div>
                    <div className="col d-flex">
                      <div className=" fw-bold">
                        {moment(course.createdAt).calendar()}{" "}
                      </div>
                    </div>
                  </div>
                  {/* ngày cập nhật */}
                  <div className={`row d-flex align-items-center mb-2`}>
                    <div className="col text-end">Ngày cập nhật</div>
                    <div className="col d-flex">
                      <div className=" fw-bold">
                        {moment(course.updatedAt).fromNow()}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <hr></hr>
        <div className="mb-3">
          <Card
            title={
              <label className="form-label fw-bold fs-3 ">
                Danh sách người tham gia
              </label>
            }
          >
            {!onLoadingEnrollUser ? (
              <DataTable
                data={enrollUser}
                selectedColumn={selectedColumnEnrollUser}
                edit_direction={"/teacher/tai-khoan/chi-tiet"}
                delete_handle={() => {
                  return Promise.resolve({ success: true });
                }}
              />
            ) : (
              <TableSkeleton />
            )}
          </Card>
        </div>
        <hr></hr>
        <div className="mb-3">
          <Card
            title={
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <label className="form-label fw-bold ">
                  Danh sách bài giảng
                </label>
                <Button
                  success_btn
                  rounded
                  className="fs-4"
                  to={`/teacher/bai-giang/tao-moi?course=${params.id}`}
                  leftIcon={<FontAwesomeIcon icon={faPlus} />}
                >
                  Tạo mới
                </Button>
              </div>
            }
          >
            {!onLoading ? (
              <DataTable
                data={sections}
                selectedColumn={selectedColumnSections}
                edit_direction={`/teacher/bai-giang/chi-tiet`}
                delete_handle={SectionServices.DeleteSection}
              />
            ) : (
              <TableSkeleton />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
