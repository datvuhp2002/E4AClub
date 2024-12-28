"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "@/modules/common/components/Image";
import Link from "next/link";
const Header = ({ theme }: any) => {
  const [logo, setLogo] = useState("");
  useEffect(() => {
    const logo = process.env.FILE_URL + "svg/Logo.svg";
    setLogo(logo);
  }, [theme]);

  return (
    <div className={`${styles.wrapper} d-flex align-items-center`}>
      <div className="container d-flex align-items-center">
        <Link href="/" className={`${styles.logo}`}>
          {logo && <Image alt="logo" src={logo} logo />}
        </Link>
      </div>
    </div>
  );
};

export default Header;
