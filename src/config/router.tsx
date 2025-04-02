import { route } from "./index";
import {
  faBookAtlas,
  faChalkboardTeacher,
  faEnvelopeOpenText,
  faHome,
  faMagnifyingGlass,
  faCircle,
  faLayerGroup,
  faUsersCog,
  faBookOpen,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const directPublicRoutes = [
  {
    path: route.huongDan,
    name: "Huớng dẫn",
    icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
  },
  {
    path: route.gopY,
    name: "Góp ý",
    icon: <FontAwesomeIcon icon={faEnvelopeOpenText} />,
  },
];
const directAdminRoutes = [
  {
    text: "Tài khoản",
    icon: faUsersCog,
    path: "tai-khoan",
    subMenu: [
      {
        text: "Danh sách",
        icon: faCircle,
        path: "/admin/tai-khoan/danh-sach",
      },
      {
        text: "Tạo mới",
        icon: faCircle,
        path: "/admin/tai-khoan/tao-moi",
      },
    ],
  },
  {
    text: "Khóa học",
    icon: faBookOpen,
    path: "khoa-hoc",
    subMenu: [
      {
        text: "Danh sách",
        icon: faCircle,
        path: "/admin/khoa-hoc/danh-sach",
      },
      {
        text: "Tạo mới",
        icon: faCircle,
        path: "/admin/khoa-hoc/tao-moi",
      },
    ],
  },
  {
    text: "Bài giảng",
    icon: faGraduationCap,
    path: "bai-giang",
    subMenu: [
      {
        text: "Tạo mới",
        icon: faCircle,
        path: "/admin/bai-giang/tao-moi",
      },
    ],
  },
];
const directTeacherRoutes = [
  {
    text: "Khóa học",
    icon: faBookOpen,
    path: "khoa-hoc",
    subMenu: [
      {
        text: "Danh sách",
        icon: faCircle,
        path: "/teacher/khoa-hoc/danh-sach",
      },
      {
        text: "Tạo mới",
        icon: faCircle,
        path: "/teacher/khoa-hoc/tao-moi",
      },
    ],
  },
  {
    text: "Bài giảng",
    icon: faGraduationCap,
    path: "bai-giang",
    subMenu: [
      {
        text: "Tạo mới",
        icon: faCircle,
        path: "/teacher/bai-giang/tao-moi",
      },
    ],
  },
];

export { directPublicRoutes, directAdminRoutes, directTeacherRoutes };
