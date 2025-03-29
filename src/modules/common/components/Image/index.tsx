"use client";
import { useState, ImgHTMLAttributes } from "react";
import styles from "./Image.module.scss";
import classNames from "classnames/bind";

// Bind styles with classNames
const cx = classNames.bind(styles);

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  logo?: boolean;
  login_logo?: boolean;
  admin_logo?: boolean;
  className?: string;
  fallback?: string;
  w100?: boolean;
  w50?: boolean;
  w30?: boolean;
  minw30?: boolean;
  avatar?: boolean;
  rounded?: boolean;
  h100?: boolean;
  h50?: boolean;
  minh30?: boolean;
  course_img?: boolean;
  course_img_publish?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  admin_logo,
  logo,
  login_logo,
  rounded,
  className,
  fallback: customFallback = process.env.FILE_URL + "images/no_img.svg",
  w100,
  w50,
  w30,
  minw30,
  h100,
  h50,
  minh30,
  course_img,
  course_img_publish,
  avatar,
  ...props
}) => {
  const defaultFallback = process.env.FILE_URL + "images/no_img.svg";
  const [fallback, setFallback] = useState<string>(src || defaultFallback);

  function handleError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    if (fallback !== defaultFallback) {
      setFallback(defaultFallback);
      event.currentTarget.src = defaultFallback;
    }
  }
  const classes = cx("wrapper", {
    admin_logo,
    avatar,
    login_logo,
    logo,
    w100,
    w30,
    w50,
    minw30,
    h100,
    h50,
    minh30,
    rounded,
    course_img,
    course_img_publish,
    [className!]: className,
  });
  return (
    <img
      src={fallback}
      onError={handleError}
      className={classes}
      alt={alt}
      {...props}
    />
  );
};

export default Image;
