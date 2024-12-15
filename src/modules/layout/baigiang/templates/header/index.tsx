import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
// import CircularWithValueLabel from "~/components/CircularProgressWithLabel";

const cx = classNames.bind(styles);

interface CourseData {
  name?: string;
}

const HeaderLesson: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData>({});
  const [totalLessonHasBeenLearned, setTotalLessonHasBeenLearned] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalLessonData, setTotalLessonData] = useState(0);
  const nextParam = useParams();

  useEffect(() => {
    if (!nextParam.id) return; // Wait until `id` is available
    console.log(nextParam.id);
    // const fetchData = async () => {
    //   try {
    //     const courses = requestApi({ endpoint: `/courses/${id}` });
    //     const promiseLessonData = requestApi({
    //       endpoint: `/lessons/all-lesson?get_all=All&course_id=${id}`,
    //     });
    //     const promiseUserProgressListLessonHasBeenLearned = requestApi({
    //       endpoint: `/user-progress/getAllLessonUserHasLearned/${id}`,
    //     });

    //     const responses = await Promise.all([
    //       courses,
    //       promiseLessonData,
    //       promiseUserProgressListLessonHasBeenLearned,
    //     ]);

    //     const courseResponse = responses[0];
    //     const lessonResponse = responses[1];
    //     const progressResponse = responses[2];

    //     setCourseData(courseResponse?.data || {});
    //     setTotalLessonData(lessonResponse?.data?.total || 0);
    //     setTotalLessonHasBeenLearned(progressResponse?.data?.total || 0);

    //     // Calculate progress percentage
    //     const calculatePercentage =
    //       lessonResponse?.data?.total > 0
    //         ? (progressResponse?.data?.total / lessonResponse.data.total) * 100
    //         : 0;
    //     setProgress(calculatePercentage);
    //   } catch (err) {
    //     console.error("Error fetching data:", err);
    //   }
    // };

    // fetchData();
  }, [nextParam.id]); // Fetch data when `id` is available

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
                {courseData?.name || "Course Name"}
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
