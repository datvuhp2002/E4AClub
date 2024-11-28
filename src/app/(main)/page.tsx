import React from "react";
import styles from "./Main.module.scss";
import { auth } from "@/auth";
import Image from "@/modules/common/components/Image";
const page = async () => {
  const session = await auth();
  if (!session?.user) return null;
  return (
    <div className={`${styles.wrapper} mt-5`}>
      <div className={`${styles.container} row`}>
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <Image
            alt=""
            className="fa-spin-slower fa-spin-reverse h-75 "
            src={`${process.env.FILE_URL}svg/trongdong.svg`}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
