"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Learning.module.scss";
import moment from "moment";
import "moment/locale/vi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@/ckeditor5/build/ckeditor";
import { useParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faChevronLeft,
  faChevronRight,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import LessonCard from "@/modules/layout/baigiang/components/lesson-card";

const cx = classNames.bind(styles);

interface QuizAnswer {
  answer: string;
  correct: string;
}

interface QuizData {
  title: string;
  createdAt: string;
  question: string;
  QuizAnswer: QuizAnswer[];
}

interface LessonData {
  id: number;
  title: string;
  videoFile: string | null;
  videoUrl: string | null;
  content: string;
  updatedAt: string;
}

interface CourseData {
  id: number;
  title: string;
  // Add other properties as needed
}

interface CourseReceivedData {
  id: number;
  // Add other properties as needed
}

interface CommentData {
  id: number;
  content: string;
  // Add other properties as needed
}

const Page = () => {
  moment.locale("vi");
  const nextParam = useParams();

  const [courseData, setCourseData] = useState<CourseData>({} as CourseData);
  const [courseReceivedData, setCourseReceivedData] = useState<
    CourseReceivedData[]
  >([]);
  const [lessonData, setLessonData] = useState<{ data: LessonData[] }>({
    data: [],
  });
  const [lesson, setLesson] = useState<number>(1);
  const [detailLessonData, setDetailLessonData] = useState<LessonData>(
    {} as LessonData
  );
  const [showLesson, setShowLesson] = useState<boolean>(true);
  const [listsComment, setListsComment] = useState<CommentData[]>([]);
  const [isShowComment, setShowComment] = useState<boolean>(false);
  const [listLessonId, setListLessonId] = useState<number[]>([]);
  const [quiz, setQuiz] = useState<string | undefined>(undefined);
  const [isQuiz, setIsQuiz] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuizData>({} as QuizData);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [showBorder, setShowBorder] = useState<boolean>(false);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);
  const onNavigate = (i: number) => {
    // navigate(`/course/learning/${params.id}?lesson=${i}`);
    // fetchComments(i);
  };

  return (
    <div className={cx("wrapper", `d-flex`)}>
      <div
        className={cx(
          "course",
          `${!showLesson ? "w-100" : ""} ${
            isShowComment ? "overflow-hidden" : ""
          }`
        )}
      >
        <div className={cx("vid", "w-100")}>
          {true && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/5ESESVMoVMg?autoplay=1`}
              allow="autoplay; fullscreen"
              title="Lesson Video"
            />
          )}
        </div>
        {detailLessonData && (
          <div className={cx("content", "mt-5 container")}>
            <div className={cx("content_top")}>
              <h1>{detailLessonData.title}</h1>
              <p>Cập nhật {moment(detailLessonData.updatedAt).fromNow()}</p>
            </div>
            {/* <CKEditor
                editor={Editor}
                className="border border-0 p-0"
                data={detailLessonData.content}
                disabled={true}
                onInit={(editor: any) => {
                  editor.ui.view.editable.element.parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.view.editable.element
                  );
                }}
                config={{
                  style: { padding: "0" },
                  toolbar: [],
                  removePlugins: ["Heading", "Link"],
                  isReadOnly: true,
                }}
              /> */}
            {showLesson && (
              <div className={cx("info", "pt-2")}>
                <header className="p-3 pt-4 ">
                  <h2>
                    <strong>Nội dung khóa học:</strong>
                  </h2>
                </header>
                {lessonData.data &&
                  lessonData.data.map((item, index) => {
                    return <LessonCard key={index} index={index} data={item} />;
                  })}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={cx("action", "d-flex  justify-content-between")}>
        <div className="col-1"></div>
        {lessonData.data && (
          <div className="d-flex align-items-center">
            <Button
              leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
              previous_lesson
              // onClick={() => onNavigate(previousLessonId)}
              // disabled={previousLessonId === null}
            >
              Bài trước
            </Button>
            <Button
              rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
              next_lesson
              // onClick={() => onNavigate(nextLessonId)}
              // disabled={nextLessonId === null}
            >
              Bài tiếp theo
            </Button>
          </div>
        )}
        <div className="me-3">
          {showLesson ? (
            <Button
              className="p-0 w-0"
              previous_lesson
              onClick={() => {
                setShowLesson(!showLesson);
              }}
              leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
            ></Button>
          ) : (
            <Button
              className="p-0 w-0"
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
