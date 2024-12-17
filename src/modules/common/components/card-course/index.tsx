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

const cx = classNames.bind(styles);

// Định nghĩa kiểu cho `data` prop
interface CourseData {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
}

// Định nghĩa kiểu cho `Card` props
interface CardCourseProps {
  data: CourseData;
  className?: string;
  isUserCourses?: boolean;
}

const CardCourse: React.FC<any> = ({
  data,
  className,
  isUserCourses = false,
}) => {
  const classes = cx("wrapper", {
    [className || ""]: className,
  });
  return (
    <div className={`${classes} h-100 mt-2`}>
      <div
        className={cx(
          "thumbnail",
          "d-flex align-items-center w-100 justify-content-center"
        )}
      >
        {data.totalSections > 0 ? (
          <Button
            rounded
            to={`/bai-giang/${data._id}?section=1`}
            className={cx("course_btn")}
          >
            Vào học
          </Button>
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
        <p className="fw-bold fs-6 fw-regular">{data.description}</p>
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
