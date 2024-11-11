import React from "react";
import styles from "./Header.module.scss";
import Image from "@/modules/common/components/Image";

const Header = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <Image
        alt="logo"
        src={process.env.FILE_URL + "images/logo.jpg"}
        login_logo
      />
    </div>
  );
};

export default Header;
