import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./SearchCourseResult.module.scss";
import Image from "../Image";
import Link from "next/link";

const cx = classNames.bind(styles);

interface SearchCourseResultProps {
  data: {
    id: string;
    name: string;
    thumbnail: string;
    nickname: string;
    tick?: boolean;
  };
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

function SearchCourseResult({ data, onClick }: SearchCourseResultProps) {
  return (
    <Link
      href={`/course-detail/${data.id}`}
      className={cx("wrapper")}
      onClick={onClick}
    >
      <Image
        alt=""
        className={cx("avatar")}
        src={`${process.env.NEXT_PUBLIC_API_URL}/${data.thumbnail}`}
      />
      <div className={cx("info")}>
        <h4 className={cx("title")}>
          <span>{data.name}</span>
          {data.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </h4>
        <span className={cx("username")}>{data.nickname}</span>
      </div>
    </Link>
  );
}

export default SearchCourseResult;
