"use client";
import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Learning.module.scss";
import moment from "moment";
import "moment/locale/vi";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import LessonCard from "@/modules/layout/baigiang/components/lesson-card";
import SectionServices from "@/services/section-services";
import ExercisesServices from "@/services/exercises-services";
import MultipleChoice from "@/modules/layout/baigiang/components/multiple-choice";
import SingleChoice from "@/modules/layout/baigiang/components/single-choice";
import FillBlank from "@/modules/layout/baigiang/components/FillBlank";
import Speaking from "@/modules/layout/baigiang/components/Speaking";
import Conversation from "@/modules/layout/baigiang/components/Conversation";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";
import SentenceWrapper from "@/modules/layout/baigiang/components/SentenceWrapper";
const cx = classNames.bind(styles);

const Page = () => {
  moment.locale("vi");
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentSection, setCurrentSection] = useState(1);
  const [maxSection, setMaxSection] = useState(1);
  const [lessonData, setLessonData] = useState<ISection[]>();
  const [showLesson, setShowLesson] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth > 768);
  const [sectionData, setSectionData] = useState<ISection>();
  const [isExercise, setIsExercise] = useState<boolean>(false);
  const [html, setHtml] = useState<string>("");
  const [exercises, setExercises] = useState<IExercise>();

  

  useEffect(() => {
    const currentSection = searchParams.get("section");
    const currentExercise = searchParams.get("quiz");
    if (currentExercise) {
      setIsExercise(true);
      ExercisesServices.GetExerciseById(currentExercise)
        .then((res) => {
          setExercises(res.exercise);
        })
        .catch((e) => {
          console.error("Error fetching exercise:", e);
        });
      return;
    }
    if (currentSection && !isNaN(Number(currentSection))) {
      setCurrentSection(Number(currentSection));
      setIsExercise(false);
      SectionServices.GetSectionByOrder(params.id, Number(currentSection))
        .then((res) => {
          setSectionData(res.section);
          setHtml(res.section.content || "");
        })
        .catch((err) => {
          console.error("Error fetching section:", err);
        });
    } else {
      setIsExercise(true);
    }
  }, [searchParams, params.id]);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const onNavigate = (section: number) => {
    router.push(pathname + "?" + createQueryString("section", `${section}`));
  };
  const renderExercise = (exercise: IExercise) => {
    switch (exercise.type) {
      case "multiple-choice":
        return (
          <MultipleChoice
            exerciseId={exercise._id}
            quizData={exercise.options}
          />
        );
      case "single-choice":
        return (
          <SingleChoice exerciseId={exercise._id} quizData={exercise.options} />
        );
      case "fill-in-the-blank":
        return (
          <FillBlank
            question={exercise.question}
            correctAnswer={exercise.blankAnswer}
            exerciseId={exercise._id}
          />
        );
      case "speaking":
        return (
          <Speaking exerciseId={exercise._id} question={exercise.question} />
        );
      case "conversation":
        return (
          <Conversation key={exercise._id} exerciseId={exercise._id} data={exercise} />
        )
      default:
        return <p>Loại bài tập không xác định</p>;
    }
  };
  useEffect(() => {
    SectionServices.GetSectionFromCourse(params.id)
      .then((res) => {
        if (res.success) {
          console.log(res);
          setMaxSection(res.sections.length);
          setLessonData(res.sections);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={cx("wrapper", `d-flex`)}>
      {isExercise === false ? (
        <div className={cx("course", `${!showLesson ? "w-100" : ""}`)}>
          {sectionData?.video !== undefined &&
            sectionData?.video !== null &&
            sectionData?.video !== "" && (
              <div className={cx("vid", "w-100")}>
                <iframe
                  key={sectionData._id}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${sectionData.video}?autoplay=1`}
                  allow="autoplay; fullscreen"
                  title="Lesson Video"
                />
              </div>
            )}
          {sectionData && (
            <div className={cx("content", "mt-5 container")}>
              <div className={cx("content_top")}>
                <SentenceWrapper style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: 12 }} text={sectionData.title} />
                <p>Cập nhật {moment(sectionData.updatedAt).fromNow()}</p>
              </div>
              <div
                className="overflow-x-scroll"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={cx("course", `${!showLesson ? "w-100" : ""}`)}>
          {exercises && (
            <div className={cx("content", "mt-5 container")}>
              <div className={cx("content_top")}>
                {exercises.type !== "speaking" && exercises.type !== "conversation" && (
                  <>
                    <SentenceWrapper style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: 12 }} text={exercises.question} />
                    <p>Cập nhật {moment(exercises.updatedAt).fromNow()}</p>
                  </>
                )}
              </div>
              {/* nội dung bài tập */}
              <div>{renderExercise(exercises)}</div>
            </div>
          )}
        </div>
      )}
      {showLesson && (
        <div className={cx("info", "pt-2")}>
          <header className="p-3 pt-4 ">
            <h2>
              <strong>Nội dung khóa học:</strong>
            </h2>
          </header>
          {lessonData &&
            lessonData.map((item, index) => {
              return <LessonCard key={index} index={index} data={item} />;
            })}
        </div>
      )}
      <div className={cx("action", "d-flex  justify-content-between")}>
        <div className="col-1"></div>
        {lessonData && (
          <div className="d-flex align-items-center">
            <Button
              leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
              previous_lesson
              onClick={() => onNavigate(currentSection - 1)}
              className={`${Number(currentSection) === 1 ? "disabled" : ""} d-flex px-3`}
              disabled={Number(currentSection) === 1}
            >
              <span className="d-none d-md-flex"> Bài trước</span>
            </Button>
            <Button
              rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
              next_lesson
              onClick={() => onNavigate(currentSection + 1)}
              className={`${Number(currentSection) === maxSection ? "disabled" : ""} d-flex  px-3 mt-0`}
              disabled={Number(currentSection) === maxSection}
            >
              <span className="d-none d-md-flex"> Bài tiếp theo</span>
            </Button>
          </div>
        )}
        <div className="me-3">
          {showLesson ? (
            <Button
              className="p-0 w-0  px-3"
              previous_lesson
              onClick={() => {
                setShowLesson(!showLesson);
              }}
              leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
            ></Button>
          ) : (
            <Button
              className="p-0 w-0  px-3"
              previous_lesson
              onClick={() => {
                setShowLesson(!showLesson);
              }}
              leftIcon={<FontAwesomeIcon icon={faBars} />}
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
