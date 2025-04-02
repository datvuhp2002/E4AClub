import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./card-course-style-2.module.scss";
import classNames from "classnames/bind";
import { LinearProgress } from "@mui/material";
import Image from "@/modules/common/components/Image";

const cx = classNames.bind(styles);

const CardCourseStyle2: React.FC<any> = ({ data, className }) => {
  return (
    <Link
      href={`/bai-giang/${data._id}?section=1`}
      className={cx("wrapper", "")}
    >
      <div className={cx("wrapper-img")}>
        <Image alt={data.title} src={`${data.image}`} h100 w100 />
      </div>
      <div
        className={cx(
          "wrapper-info",
          "d-flex flex-column justify-content-between"
        )}
      >
        <div>
          <h6 className={cx("wrapper-title")}>{data.title}</h6>
          <p className={cx("wrapper-desc", "mb-0")}>{data.description}</p>
        </div>
        {data.progress && (
          <div className="row d-flex align-items-center">
            <div className="col-10 d-flex align-items-center">
              <LinearProgress
                value={data.progress}
                variant="determinate"
                className={cx("progress", "w-100")}
                style={{ height: "1rem" }}
              />
            </div>
            <div className="col-2">
              <span className="text-end">{Math.floor(data.progress)}%</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CardCourseStyle2;
