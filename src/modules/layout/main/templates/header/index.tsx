"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "@/modules/common/components/Image";
import Search from "@/modules/common/components/Search";
import Menu from "@/modules/common/components/Popper/Menu";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const Header = ({ theme }: any) => {
  const [logo, setLogo] = useState("");
  const { data: session, status } = useSession();
  const Menu_item = [
    [
      {
        title: `Trang cá nhân`,
        path: `/thong-tin-ca-nhan/${session?.user?.email}`,
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
      { title: "Đăng xuất", onClick: signOut, path: "auth/login" },
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
