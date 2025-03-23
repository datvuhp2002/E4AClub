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
  const [showLesson, setShowLesson] = useState<boolean>(true);
  const [sectionData, setSectionData] = useState<ISection>();
  const [html, setHtml] = useState<string>("");
  useEffect(() => {
    const current_section = searchParams.get("section");
    setCurrentSection(Number(current_section));
    if (current_section) {
      SectionServices.GetSectionByOrder(params.id, current_section)
        .then((res) => {
          setSectionData(res.section);
          setHtml(res.section.content || "");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchParams]);
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

  useEffect(() => {
    SectionServices.GetSectionFromCourse(params.id)
      .then((res) => {
        if (res.success) {
          setMaxSection(res.sections.length);
          setLessonData(res.sections);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={cx("wrapper", `d-flex`)}>
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
              <h1>{sectionData.title}</h1>
              <p>Cập nhật {moment(sectionData.updatedAt).fromNow()}</p>
            </div>
            <div
              className="overflow-x-scroll"
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
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
          </div>
        )}
      </div>
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
