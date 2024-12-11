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

  const [totalLesson, setTotalLessonData] = useState<number>(0);
  const [totalUserRegistered, setTotalUserRegistered] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <div className={`${classes} h-100 mt-2`}>
      <div
        className={cx(
          "thumbnail",
          "d-flex align-items-center w-100 justify-content-center"
        )}
      >
        {true ? (
          <Button
            rounded
            to={`/bai-giang/${data.id}`}
            className={cx("course_btn")}
          >
            Tiếp tục học
          </Button>
        ) : (
          <Button
            rounded
            to={`/bai-giang/chi-tiet/${data.id}`}
            className={cx("course_btn")}
          >
            Đăng ký học
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
        <h3 className="fw-bold ">{data.name}</h3>
        <div
          className={cx(
            "title",
            "d-flex align-items-start w-100 justify-content-between p-3"
          )}
        >
          <div className="d-flex">
            <FontAwesomeIcon icon={faUserGroup} className="me-2" />
            <span className="col-4 p-0 w-100">{totalUserRegistered}</span>
          </div>
          <div className="d-flex">
            <FontAwesomeIcon icon={faPlayCircle} className="me-2" />
            <span className="col-4 p-0">{totalLesson}</span>
          </div>
        </div>
        {isUserCourses && (
          <LinearProgress
            value={percentage}
            color="success"
            variant="determinate"
            className={cx("progress", "w-100")}
          />
        )}
      </div>
    </div>
  );
};

export default CardCourse;
