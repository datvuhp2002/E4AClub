"use client";
import React, { useEffect, useState } from "react";
import styles from "./Setting.module.scss";
import Card from "@/modules/common/components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/modules/common/components/Button";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "@/modules/common/components/Image";
import ThemeToggle from "@/modules/common/components/theme-toggle";
import UserServices from "@/services/user-services";
import { Skeleton } from "@mui/material";
const page = () => {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    UserServices.Info()
      .then((res) => setUserData(res.user))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className={styles.wrapper}>
      <Card title={<strong>Cài đặt</strong>}>
        <div className={`${styles.content} mb-5`}>
          <div className={styles.title_header}>
            <h2>
              <strong>Thông tin cá nhân</strong>
            </h2>
            <div>Quản lý thông tin cá nhân của bạn</div>
          </div>
          <div>
            {userData ? (
              <div className={`${styles.wrapper_content} mt-3`}>
                <div
                  className={`${styles.content} d-flex justify-content-between`}
                >
                  <div className={`${styles.info}`}>
                    <h4 className=" m-0">Họ và tên</h4>
                    <p className={`${styles.value} fw-bolder m-0 mt-2`}>
                      {userData.name ? userData.name : "Còn trống..."}
                    </p>
                  </div>
                  <div className={`${styles.actions}`}>
                    <Button
                      className="d-flex align-items-center justify-content-end fs-2"
                      more
                      leftIcon={<FontAwesomeIcon icon={faChevronRight} />}
                    />
                  </div>
                </div>
                <div
                  className={`${styles.content} d-flex justify-content-between`}
                  // onClick={() => setModalUsernameShow(true)}
                >
                  <div className={`${styles.info}`}>
                    <h4 className=" m-0">Email</h4>
                    <p className={`${styles.value} fw-bolder m-0 mt-2`}>
                      {userData.email ? userData.email : "Còn trống..."}
                    </p>
                  </div>
                  <div className={`${styles.actions}`}>
                    <Button
                      className="d-flex align-items-center justify-content-end fs-2"
                      more
                      leftIcon={<FontAwesomeIcon icon={faChevronRight} />}
                    />
                  </div>
                </div>
                <div
                  className={`${styles.content_hasImg} d-flex justify-content-between`}
                  // onClick={() => setModalAvatarShow(true)}
                >
                  <div className={`${styles.info}`}>
                    <h4 className=" m-0">Ảnh đại diện</h4>
                    <div className={`${styles.avatar} m-0`}>
                      <Image alt="avatar" src={``} />
                    </div>
                  </div>
                  <div className={`${styles.actions}`}>
                    <Button
                      className="d-flex align-items-center justify-content-end fs-2"
                      more
                      leftIcon={<FontAwesomeIcon icon={faChevronRight} />}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${styles.wrapper_content} mt-3`}>
                <div
                  className={`${styles.content} d-flex justify-content-between`}
                >
                  <Skeleton width="100%" />
                </div>
                <div
                  className={`${styles.content} d-flex justify-content-between`}
                >
                  <Skeleton width="100%" />
                </div>
                <div
                  className={`${styles.content} d-flex justify-content-between`}
                >
                  <Skeleton width="100%" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.content} mb-3`}>
          <div className={`${styles.title_header} mt-5`}>
            <h2>
              <strong>Thông tin bảo mật</strong>
            </h2>
          </div>
          <div>
            <div className={`${styles.wrapper_content} mt-3`}>
              <div
                className={`${styles.content} d-flex justify-content-between`}
              >
                <div className={`${styles.info}`}>
                  <h4 className="fw-bolder m-0">Đổi mật khẩu</h4>
                </div>
                <div className={`${styles.actions}`}>
                  <Button
                    className="d-flex align-items-center justify-content-end fs-2"
                    more
                    leftIcon={<FontAwesomeIcon icon={faChevronRight} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
