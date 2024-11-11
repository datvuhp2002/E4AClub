import React, { ReactNode } from "react";
import styles from "./Popper.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface WrapperProps {
  slide_card_money?: boolean;
  chart?: boolean;
  chart_data?: boolean;
  manager_information?: boolean;
  children: ReactNode;
  className?: string;
  money?: boolean;
}

export function Wrapper({
  slide_card_money,
  chart,
  chart_data,
  manager_information,
  children,
  className,
  money,
}: WrapperProps) {
  const classes = cx("wrapper", {
    money,
    slide_card_money,
    chart_data,
    chart,
    manager_information,
    [className || ""]: className, // Default to empty string if className is undefined
  });
  return <div className={classes}>{children}</div>;
}
