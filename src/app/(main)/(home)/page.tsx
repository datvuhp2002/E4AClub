"use client";
import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import CourseServices from "@/services/course-services";
import CardCourse from "@/modules/common/components/card-course";
const Page = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    // CourseServices.getCourse(4)
    //   .then((res) => setCourse(res.data))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className={`${styles.wrapper} mt-4 row align-items-center justify-content-center`}
    >
      <div className={`${styles.container} col-md-10 `}>
        <div className="h-100 d-flex flex-column align-items-start justify-content-center">
          <div className="fw-bold fs-2">Khóa học</div>
          <div className="d-flex w-100 justify-content-between align-items-center mb-4">
            <div className={`row w-100`}>
              {course && course.length > 0 ? (
                course.map((item, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
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
