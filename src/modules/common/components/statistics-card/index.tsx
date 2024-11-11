"use client";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import Styles from "./StatisticsCard.module.scss";
import classNames from "classnames/bind";
import Skeleton from "@mui/material/Skeleton";

const cx = classNames.bind(Styles);

const StatisticsCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  blue_card?: boolean;
  purple_card?: boolean;
  light_yellow_card?: boolean;
  light_red_card?: boolean;
  icon?: ReactNode;
}> = ({
  children,
  className,
  blue_card,
  purple_card,
  light_yellow_card,
  light_red_card,
  icon,
}) => {
  const classes = cx("wrapper", {
    blue_card,
    purple_card,
    light_yellow_card,
    light_red_card,
    [className as string]: className,
  });
  const color = blue_card
    ? "var(--statistics-card-bg-blue-color)"
    : purple_card
      ? "var(--statistics-card-bg-purple-color)"
      : light_yellow_card
        ? "var(--statistics-card-bg-light-yellow-color)"
        : light_red_card
          ? "var(--statistics-card-bg-light-red-color)"
          : "var(--statistics-card-bg-default-color)";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className={classes}>
      {isClient ? (
        <Suspense fallback={<Skeleton height={"19rem"} variant="rounded" />}>
          <span
            className={cx(`bg_img`)}
            style={{
              mask: `url(${process.env.FILE_URL}/svg/shape-square.svg) center center / contain no-repeat`,
            }}
          ></span>
          <div className={cx(`body`)}>
            <div
              className={cx("header", "d-flex justify-content-between w-100 ")}
            >
              {icon && (
                <span
                  className={cx(
                    "icon",
                    "col-12 d-flex align-items-center justify-content-center"
                  )}
                >
                  {icon}
                </span>
              )}
            </div>
            <div className={cx("children", "mt-2")}>{children}</div>
          </div>
        </Suspense>
      ) : (
        <Skeleton height={"19rem"} variant="rounded" />
      )}
    </div>
  );
};

export default StatisticsCard;
