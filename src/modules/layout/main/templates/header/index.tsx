"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "@/modules/common/components/Image";
import Search from "@/modules/common/components/Search";
import Menu from "@/modules/common/components/Popper/Menu";
import { onHandleLogout } from "@/common/handle_logout";

interface Route {
  path: string;
  name?: string; // 'name' là tùy chọn
  icon?: React.ReactNode;
}

const Header = ({ theme }: any) => {
  const [userData, setUserData] = useState<any>();
  const [logo, setLogo] = useState("");

  const Menu_item = [
    // [{ title: "Trang cá nhân", path: `/info/${userData.username}` }],
    [{ title: "Trang cá nhân", path: `/info/abc}` }],
    [{ title: "Khoá học của tôi", path: "/my-courses" }],
    [
      { title: "Bài viết đã lưu", path: "/saved-posts" },
      { title: "Bài viết của bạn", path: "/my-posts" },
    ],
    [{ title: "Luyện tập lập trình", path: "/practice-programming" }],
    [
      { title: "Cài đặt", path: `/setting` },
      { title: "Đăng xuất", onClick: onHandleLogout, path: "/login" },
    ],
  ];
  useEffect(() => {
    const logo = process.env.FILE_URL + "svg/Logo.svg";
    setLogo(logo);
  }, [theme]);

  return (
    <div className={`${styles.wrapper} d-flex align-items-center`}>
      <div className="container d-flex align-items-center">
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
  );
};

export default Header;
