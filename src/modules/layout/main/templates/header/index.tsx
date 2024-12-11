"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "@/modules/common/components/Image";
import Search from "@/modules/common/components/Search";
import Menu from "@/modules/common/components/Popper/Menu";
import AuthServices from "@/services/auth-services";
import Cookies from "js-cookie";
const Header = ({ theme }: any) => {
  const [logo, setLogo] = useState("");
  const Menu_item = [
    [
      {
        title: `Trang cá nhân`,
        path: `/thong-tin-ca-nhan/${Cookies.get("email")}`,
      },
    ],
    [{ title: "Khoá học của tôi", path: "/khoa-hoc/ca-nhan" }],
    [
      { title: "Bài viết đã lưu", path: "/bai-viet/luu-tru" },
      { title: "Bài viết của bạn", path: "/bai-viet/ca-nhan" },
    ],
    [{ title: "Luyện tập lập trình", path: "/luyen-tap/lap-trinh" }],
    [
      { title: "Cài đặt", path: `/cai-dat` },
      { title: "Đăng xuất", onClick: AuthServices.Logout, path: "auth/login" },
    ],
  ];
  useEffect(() => {
    const logo = process.env.FILE_URL + "svg/Logo.svg";
    setLogo(logo);
  }, [theme]);

  return (
    <div
      className={`${styles.wrapper} d-flex align-items-center justify-content-center`}
    >
      <div className="container d-flex align-items-center row align-items-center justify-content-center">
        <div className="col-md-10 d-flex">
          <div className={`${styles.logo}`}>
            {logo && <Image alt="logo" src={logo} logo />}
          </div>
          {/* search */}
          <Search />
          {/* action */}
          <div className={`${styles.action} d-flex justify-content-end`}>
            <Menu items={Menu_item}>
              {/* {userData.avatar ? (
                <Image avatar rounded alt="" src={userData.avatar} />
              ) : ( */}
              <Image className="border" avatar rounded alt="" src={logo} />
              {/* )} */}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
