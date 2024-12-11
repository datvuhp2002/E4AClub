"use client";
import React, { useEffect } from "react";
import styles from "./GioiThieu.module.scss";
import Image from "@/modules/common/components/Image";
import Cookies from "js-cookie";
const Page = () => {
  useEffect(() => {}, []);

  return (
    <div
      className={`${styles.wrapper} mt-5 row align-items-center justify-content-center`}
    >
      <div className={`${styles.container} col-md-10 `}>
        <div className="row w-100 position-relative ">
          <div className="w-md-50 position-absolute end-0 top-0">
            <Image
              alt=""
              className="fa-spin-slower fa-spin-reverse h-75"
              src={`${process.env.FILE_URL}svg/trongdong.svg`}
            />
          </div>
          <div className="col-md-6">
            <div className="h-100 d-flex flex-column align-items-start justify-content-center">
              <h2 className="fw-bold fs-1">
                Xin chào {Cookies.get("email")} !
              </h2>
              <span className="fw-normal fs-2 text-justify mt-3 lh-base">
                Đây là một website về khóa học tiếng anh, kế hoạch được thực
                hiện bởi E4A Club T07 nhằm cung cấp cho học viên những khóa học
                và phương pháp học tiếng Anh cùng với các video minh họa theo
                chương trình. Bên cạnh đó, ngân hàng kiểm tra, đánh giá và các
                video về kỹ thuật đánh giá cũng được xây dựng thành các bộ đề
                đánh giá phù hợp.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
