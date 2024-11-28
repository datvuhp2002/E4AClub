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

const cx = classNames.bind(styles);

// Định nghĩa kiểu cho privateRoutes
type Route = {
  path: string;
  name?: string;
  icon?: JSX.Element; // Icon có thể là một React component
};
const privateRoutes = [
  {
    path: "/",
    name: "Trang chủ",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    path: "khoa-hoc",
    name: "Khóa học",
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    path: "/bai-viet",
    name: "Bài viết",
    icon: <FontAwesomeIcon icon={faNewspaper} />,
  },
];
const Sidebar: React.FC = () => {
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
        {privateRoutes.map((item: Route, index: number) =>
          item.name ? (
            <Button sidebar key={index} to={item.path} leftIcon={item.icon}>
              {item.name}
            </Button>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Sidebar;
