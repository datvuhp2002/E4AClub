"use client";
import React from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHome,
  faNewspaper,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import { usePathname } from "next/navigation";
import { route } from "@/config";

const cx = classNames.bind(styles);
// Định nghĩa kiểu cho privateRoutes
type Route = {
  path: string;
  name?: string;
  icon?: JSX.Element; // Icon có thể là một React component
};
const privateRoutes = [
  {
    path: route.trang_chu,
    name: "Trang chủ",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  // {
  //   path: route.khoa_hoc,
  //   name: "Khóa học",
  //   icon: <FontAwesomeIcon icon={faBook} />,
  // },
  {
    path: route.gioi_thieu,
    name: "Giới thiệu",
    icon: <FontAwesomeIcon icon={faNewspaper} />,
  },
];
const Sidebar: React.FC = () => {
  const pathName = usePathname();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar", "d-flex align-items-center")}>
        {/* Nút tạo bài viết */}
        {/* <Button
          sidebar
          rounded
          add_blog_icon
          white
          to="/create-post"
          leftIcon={<FontAwesomeIcon icon={faPenNib} />}
        /> */}
        {/* Hiển thị danh sách các route */}
        {privateRoutes.map((item: Route, index: number) => {
          const isActive =
            item.path === "/"
              ? pathName === item.path
              : pathName.startsWith(item.path) && item.path !== "/";
          return item.name ? (
            <Button
              sidebar
              active={isActive}
              key={index}
              to={item.path}
              leftIcon={item.icon}
            >
              {isActive}
              {item.name}
            </Button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
