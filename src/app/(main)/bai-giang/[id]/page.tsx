import React from "react";
import styles from "./Learning.module.scss";
const Page = () => {
  return (
    <div
      className={`${styles.wrapper} mt-4 row align-items-center justify-content-center`}
    >
      <div className={`${styles.container} col-md-10 `}>
        <div className="h-100 d-flex flex-column align-items-start justify-content-center">
          <div className="fw-bold fs-2">Khóa học [id]</div>
          <div className="d-flex w-100 justify-content-between align-items-center mb-4">
            <div className={`row w-100`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
