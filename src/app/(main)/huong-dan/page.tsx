import React from "react";
import styles from "./HuongDan.module.scss";
import CollapseInstructionRegisterLibraryCard from "@/modules/common/share-pages/collapse-instruction-register-library";
const page = () => {
  return (
    <div className={`${styles.wrapper} shadow-sm align-items-center  `}>
      <h3 className={`${styles.title} d-sm-block mb-2`}>Hướng dẫn</h3>
      <CollapseInstructionRegisterLibraryCard />
    </div>
  );
};

export default page;
