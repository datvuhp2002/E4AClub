import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./card-course-style-2.module.scss";
import classNames from "classnames/bind";
import { LinearProgress } from "@mui/material";
import Image from "@/modules/common/components/Image";

const cx = classNames.bind(styles);

const CardCourseStyle2: React.FC<any> = ({ data, className }) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Link
      href={`/bai-giang/${data._id}?section=1`}
      className={cx("wrapper", "")}
    >
      <div className={cx("wrapper-img")}>
        <Image alt={data.title} src={`${data.image}`} h100 w100 />
      </div>
      <div className={cx("wrapper-info")}>
        <h6 className={cx("wrapper-title")}>{data.title}</h6>
        <p className={cx("wrapper-desc", "mb-0")}>{data.description}</p>
        <div
          className={cx("wrapper-progress")}
          style={{ "--progress": "80%" } as React.CSSProperties}
        ></div>
        <LinearProgress
          value={80}
          color="success"
          variant="determinate"
          className={cx("progress", "w-100")}
        />
      </div>
    </Link>
  );
};

export default CardCourseStyle2;
