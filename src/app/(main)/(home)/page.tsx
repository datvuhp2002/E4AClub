"use client";
import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import CourseServices from "@/services/course-services";
import CardCourse from "@/modules/common/components/card-course";
import Image from "@/modules/common/components/Image";

const Page = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    CourseServices.GetAllCoursesWithCheckEnrolled()
      .then((res) => {
        setCourse(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div
      className={`${styles.wrapper} mt-4 row align-items-center justify-content-center`}
    >
      <div className={`${styles.container} col-md-10 `}>
        <div className="h-100 d-flex flex-column align-items-start justify-content-center">
          <div className="fw-bold fs-2">Khóa học</div>
          <div className="d-flex w-100 justify-content-between align-items-center mb-4">
            <div className="w-md-50 position-absolute end-0 top-0 p-4">
              <Image
                alt=""
                className="fa-spin-slower fa-spin-reverse h-75"
                src={`${process.env.FILE_URL}svg/trongdong.svg`}
              />
            </div>
            <div className={`row w-100`}>
              {course && course.length > 0 ? (
                course.map((item, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <CardCourse data={item} />
                  </div>
                ))
              ) : (
                <p>Không có khóa học nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
