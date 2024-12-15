"use client";
import { useState, ImgHTMLAttributes } from "react";
import styles from "./Image.module.scss";
import classNames from "classnames/bind";

// Bind styles with classNames
const cx = classNames.bind(styles);

// Define the props interface for the Image component
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string; // Required src prop
  alt: string; // Required alt prop
  logo?: boolean; // Optional logo prop
  login_logo?: boolean; // Optional logo prop
  admin_logo?: boolean; // Optional logo prop
  className?: string; // Optional className prop
  fallback?: string; // Optional fallback image URL
  w100?: boolean; // Optional width 100% prop
  w50?: boolean; // Optional width 50% prop
  w30?: boolean; // Optional height 30% prop
  minw30?: boolean; // Optional min-width 30% prop
  avatar?: boolean; // Optional min-width 30% prop
  rounded?: boolean; // Optional min-width 30% prop
  h100?: boolean; // Optional height 100% prop
  h50?: boolean; // Optional height 50% prop
  minh30?: boolean; // Optional min-height 30% prop
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
  avatar,
  ...props
}) => {
  const [fallback, setFallback] = useState<string>(""); // State for fallback image

  // Loading component can be implemented as needed
  const Loading = () => <div className={cx("lds-dual-ring")}></div>;

  // Handle image error and set fallback image
  function handleError() {
    setFallback(customFallback);
  }

  // Generate class names for the component
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
    [className!]: className, // Use non-null assertion
  });

  return (
    <img
      className={classes} // Use the generated classes
      src={fallback || src} // Fallback to custom or default image
      alt={alt}
      {...props} // Spread other props
      onError={handleError} // Handle image load error
    />
  );
};

export default Image;
