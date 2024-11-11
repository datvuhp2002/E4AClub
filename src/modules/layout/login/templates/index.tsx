"use client";
import React from "react";
import styles from "./LoginTemp.module.scss";
import Header from "./header";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div
        className={styles.bg_img}
        style={{
          backgroundImage: `url(${process.env.FILE_URL}/images/overlay.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className={`${styles.body} container d-flex align-items-center justify-content-center`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
