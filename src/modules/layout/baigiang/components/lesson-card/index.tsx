import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./LessonCard.module.scss";

const cx = classNames.bind(styles);

// Định nghĩa kiểu cho dữ liệu của bài học
interface LessonData {
  id: string;
  title: string;
}

// Định nghĩa kiểu cho dữ liệu quiz
interface QuizData {
  id: string;
  title: string;
}

// Định nghĩa kiểu props của component
interface LessonCardProps {
  data: LessonData;
  className?: string; // Optional prop
  index: number;
}

const LessonCard: React.FC<LessonCardProps> = ({
  data,
  className,
  index,
}: any) => {
  // const { id: courseId } = useParams<{ id: string }>();
  // const location = useLocation();
  // const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizData[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [isLearned, setIsLearned] = useState<boolean>(false);
  const [quizCompletionStatus, setQuizCompletionStatus] = useState<{
    [key: string]: boolean;
  }>({});

  // const onCreateUserProgress = async (lesson_id: string) => {
  //   try {
  //     const res = await requestApi(`/user-progress`, "POST", {
  //       course_id: courseId,
  //       lesson_id,
  //     });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const onNavigate = () => {
  //   navigate(`/course/learning/${courseId}?lesson=${data.id}`);
  //   if (!isLearned) {
  //     onCreateUserProgress(data.id);
  //   } else {
  //     console.log(data.id);
  //   }
  // };

  // const onSelectedQuiz = (quiz_id: string) => {
  //   navigate(`/course/learning/${courseId}?lesson=${data.id}&quiz=${quiz_id}`);
  //   if (!isLearned) {
  //     onCreateUserProgress(data.id);
  //   } else {
  //     console.log(data.id);
  //   }
  // };

  // const fetchQuizCompletionStatus = async (quizzes: QuizData[]) => {
  //   const statusPromises = quizzes.map(async (item) => {
  //     const result = await requestApi(
  //       `/user-progress/isDoneQuiz/${courseId}?lesson_id=${data.id}&quiz_id=${item.id}`,
  //       "GET"
  //     );
  //     return { id: item.id, isDone: result.data as boolean };
  //   });

  //   const statuses = await Promise.all(statusPromises);
  //   const statusMap = statuses.reduce(
  //     (acc, curr) => {
  //       acc[curr.id] = curr.isDone;
  //       return acc;
  //     },
  //     {} as { [key: string]: boolean }
  //   );

  //   setQuizCompletionStatus(statusMap);
  // };

  const onShow = () => {
    setShow(!show);
  };

  // useEffect(() => {
  //   const checkLearned = requestApi(
  //     `/user-progress/checkIsLearned/${courseId}?lesson_id=${data.id}`
  //   );
  //   const fetchQuiz = requestApi(
  //     `/quiz/get-all-quiz-in-lesson/${data.id}`,
  //     "GET"
  //   );

  //   Promise.all([checkLearned, fetchQuiz]).then((res) => {
  //     setIsLearned(res[0].data as boolean);
  //     setQuiz(res[1].data as QuizData[]);
  //     fetchQuizCompletionStatus(res[1].data as QuizData[]);
  //   });
  // }, [location.search]);

  return (
    <div className={cx("wrapper")} key={index}>
      <div
        className={cx(
          "info_card",
          "d-flex align-items-center justify-content-between"
        )}
        onClick={onShow}
      >
        <h3 className="m-0">
          {index + 1}.{data.title}
        </h3>
        {show ? (
          <FontAwesomeIcon icon={faChevronUp} className="fs-3" />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} className="fs-3" />
        )}
      </div>
      {show && (
        <div>
          <div
            className={cx("info_card_item")}
            // onClick={onNavigate}
          >
            <div className={cx("name", "d-flex align-items-center")}>
              <h3 className="m-0 me-2">{data.title}</h3>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            {isLearned && (
              <div className={cx("icon")}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-success"
                />
              </div>
            )}
          </div>
          {quiz &&
            quiz.length > 0 &&
            quiz.map((item, idx) => (
              <div
                key={idx}
                className={cx("info_card_item")}
                onClick={() =>
                  //  onSelectedQuiz(item.id)}
                  console.log(item.id)
                }
              >
                <div className={cx("name", "d-flex align-items-center")}>
                  <h3 className="m-0 me-2">{item.title}</h3>
                  <FontAwesomeIcon icon={faFileLines} />
                </div>
                {quizCompletionStatus[item.id] && (
                  <div className={cx("icon")}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-success"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LessonCard;
