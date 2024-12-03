"use client";
import React, { useEffect } from "react";
import styles from "./ThongTinCaNhan.module.scss";
import UserServices from "@/services/user-services";
const ThongTinCaNhan = () => {
  useEffect(() => {
    try {
      UserServices.Profile().then((res) => console.log(res));
    } catch (err) {
      console.log("ERRR::::", err);
    }
  }, []);
  return <div className={`${styles.wrapper} mt-5`}>page</div>;
};

export default ThongTinCaNhan;
