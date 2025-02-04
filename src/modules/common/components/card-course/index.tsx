import React, { useEffect, useState } from "react";
import styles from "./card-course.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDollar,
  faPlayCircle,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { LinearProgress } from "@mui/material";
import Button from "../Button";
import Image from "../Image";
import UserServices from "@/services/user-services";
import { useToastContext } from "@/lib/context/toast-context";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

const CardCourse: React.FC<any> = ({
  data,
  className,
  isUserCourses = false,
}) => {
  const router = useRouter();
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
  const onEnrollCourse = async (course_id: string) => {
    try {
      UserServices.EnrollCourse(course_id)
        .then((res) => {
          if (res.success) {
            handleSuccessToast("Đăng ký thành công");
            router.push(`/bai-giang/${data._id}?section=1`);
          } else {
            handleErrorToast("Đăng ký thất bại");
          }
        })
        .catch((err) => {
          handleErrorToast("Đăng ký thất bại");
          console.error(err);
        });
    } catch (err) {
      handleErrorToast("Đăng ký thất bại");
      console.error(err);
    }
  };
  const classes = cx("wrapper", {
    [className || ""]: className,
  });
  return (
    <div className={`${classes} h-100 mt-2 border card`}>
      <div
        className={cx(
          "thumbnail",
          "d-flex align-items-center w-100 justify-content-center"
        )}
      >
        {data.totalSections > 0 ? (
          data.isEnrolled ? (
            <Button
              rounded
              to={`/bai-giang/${data._id}?section=1`}
              className={cx("course_btn")}
            >
              Tiếp tục học
            </Button>
          ) : (
            <Button
              rounded
              className={cx("course_btn")}
              onClick={() => onEnrollCourse(data._id)}
            >
              Đăng ký học
            </Button>
          )
        ) : (
          <Button
            rounded
            orange_btn
            className={cx("course_btn", "text-white bg-danger")}
          >
            Khóa học đang được cập nhật
          </Button>
        )}
        <Image
          alt=""
          src={`${process.env.API_URL}/${data.thumbnail}`}
          className="object-fit-fill"
        />
      </div>
      <div
        className={cx(
          "content",
          "d-flex flex-column w-100 p-3 justify-content-between "
        )}
      >
        <h3 className="fw-bold ">{data.title}</h3>
        <p className="fw-bold fs-5 fw-regular">{data.description}</p>
        <div
          className={cx(
            "title",
            "d-flex align-items-start w-100 justify-content-between p-3"
          )}
        >
          <div className="d-flex">
            <FontAwesomeIcon icon={faUserGroup} className="me-2" />
            <span className="col-4 p-0 w-100">{data.totalEnrolledUsers}</span>
          </div>
          <div className="d-flex">
            <FontAwesomeIcon icon={faPlayCircle} className="me-2" />
            <span className="col-4 p-0">{data.totalSections}</span>
          </div>
        </div>
        {/* {isUserCourses && (
          <LinearProgress
            value={percentage}
            color="success"
            variant="determinate"
            className={cx("progress", "w-100")}
          />
        )} */}
      </div>
    </div>
  );
};

export default CardCourse;
