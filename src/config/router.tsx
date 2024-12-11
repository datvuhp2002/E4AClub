import { route } from "./index";
import {
  faBookAtlas,
  faChalkboardTeacher,
  faEnvelopeOpenText,
  faHome,
  faMagnifyingGlass,
  faAddressCard,
  faCircle,
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
    text: "Trang chủ",
    icon: faHome,
    path: "/admin",
  },
  {
    text: "Đăng ký thẻ thư viện",
    icon: faAddressCard,
    path: "dang-ky-the-thu-vien",
    subMenu: [
      {
        text: "Duyệt đăng ký",
        icon: faCircle,
        path: "/admin/dang-ky-the-thu-vien/duyet-dang-ky",
      },
      {
        text: "Tra cứu - báo cáo",
        icon: faCircle,
        path: "/admin/dang-ky-the-thu-vien/tra-cuu-bao-cao",
      },
      {
        text: "Quản lý góp ý",
        icon: faCircle,
        path: "/admin/dang-ky-the-thu-vien/quan-ly-gop-y",
      },
    ],
  },
];

export { directPublicRoutes, directAdminRoutes };
