import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faPenRuler,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./LessonCard.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ExercisesServices from "@/services/exercises-services";

const cx = classNames.bind(styles);

interface LessonCardProps {
  data: ISection;
  className?: string;
  index: number;
}

const LessonCard: React.FC<LessonCardProps> = ({
  data,
  className,
  index,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [show, setShow] = useState<boolean>(false);
  const [exercises, setExercises] = useState<IExercise[]>();
  const [isLearned, setIsLearned] = useState<boolean>(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const onSelectedexercises = (quiz_id: string) => {
    router.push(pathname + "?" + createQueryString("quiz", `${quiz_id}`));
    // if (!isLearned) {
    //   onCreateUserProgress(data.id);
    // } else {
    //   console.log(data.id);
    // }
  };
  const onNavigate = () => {
    const params = new URLSearchParams(window.location.search);
    // Xóa tham số "quiz" nếu có
    params.delete("quiz");
    // Thêm hoặc cập nhật tham số "section"
    params.set("section", `${data.order}`);
    // Điều hướng đến URL mới
    router.push(`${pathname}?${params.toString()}`);
  };
  const onShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    ExercisesServices.GetExercisesBySection(data._id)
      .then((res) => {
        if (res.success) {
          console.log("Exercises", res);
          setExercises(res.exercises);
        }
      })
      .catch((e) => console.log(e));
  }, []);

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
          <div className={cx("info_card_item")} onClick={onNavigate}>
            <div
              className={cx(
                "name",
                "d-flex align-items-center justify-content-between"
              )}
            >
              <span className="d-flex  align-items-center ">
                <FontAwesomeIcon icon={faBookOpenReader} className="me-4" />
                <h3 className="m-0 me-2">{data.title}</h3>
              </span>
              {/* <FontAwesomeIcon icon={faCheckCircle} className="" /> */}
            </div>
            {data.isCompleted && (
              <div className={cx("icon")}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-success"
                />
              </div>
            )}
          </div>
          {exercises &&
            exercises.length > 0 &&
            exercises.map((item, idx) => (
              <div
                key={idx}
                className={cx("info_card_item")}
                onClick={() => onSelectedexercises(item._id)}
              >
                <div className={cx("name", "d-flex align-items-center")}>
                  <FontAwesomeIcon icon={faPenRuler} className="me-4" />
                  <h3 className="m-0 me-2">Bài tập {idx + 1}</h3>
                </div>
                {/* {exercisesCompletionStatus[item.id] && (
                  <div className={cx("icon")}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-success"
                    />
                  </div>
                )} */}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LessonCard;
