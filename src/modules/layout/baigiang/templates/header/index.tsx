import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import CourseServices from "@/services/course-services";
import { Skeleton } from "@mui/material";
// import CircularWithValueLabel from "~/components/CircularProgressWithLabel";

const cx = classNames.bind(styles);

interface Teacher {
  _id: string;
  name: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  teacher: Teacher;
  sections: string[]; // Assuming sections are just an array of strings (IDs)
  enrolledUsers: string[]; // Assuming enrolledUsers are represented by user IDs
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

const HeaderLesson: React.FC = () => {
  const [courseData, setCourseData] = useState<Course>();
  const [totalLessonHasBeenLearned, setTotalLessonHasBeenLearned] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalLessonData, setTotalLessonData] = useState(0);
  const nextParam = useParams();

  useEffect(() => {
    if (!nextParam.id) return; // Wait until `id` is available
    CourseServices.getCourseById(String(nextParam.id)).then((res) => {
      setCourseData(res.data);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx(
          "content",
          "d-flex align-items-center justify-content-between container h-100"
        )}
      >
        <div className={cx("logo", "d-flex")}>
          <Button
            to="/"
            className="h-100 justify-content-start text-light bg-transparent text-danger"
          >
            <div
              className={cx(
                "logo-components",
                "d-flex align-items-center justify-content-center"
              )}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="fs-2 me-4" />
              <h5 className="m-0 text-white opacity-100 bold fs-2">
                {courseData ? courseData?.title : <Skeleton />}
              </h5>
            </div>
          </Button>
        </div>
        {/* Info */}
        <div
          className={cx(
            "action",
            "d-flex justify-content-end h-100 align-items-center"
          )}
        >
          {totalLessonData > 0 && (
            <div className="text-white d-flex align-items-center">
              {/* <CircularWithValueLabel
                variant="determinate"
                targetProgress={progress}
                color="success"
              /> */}
              <p className="m-0 ms-2">
                Đã học {totalLessonHasBeenLearned}/{totalLessonData}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderLesson;
