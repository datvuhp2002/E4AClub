"use client";
import React, { useEffect, useState } from "react";
import styles from "./ThongTinCaNhan.module.scss";
import UserServices from "@/services/user-services";
import Image from "@/modules/common/components/Image";
import Card from "@/modules/common/components/Card";
import moment from "moment";
import "moment/locale/vi";
import CourseServices from "@/services/course-services";
import { useUser } from "@/lib/context/user-context";
const ThongTinCaNhan = () => {
  const { user, loading, refreshUser } = useUser();

  moment.locale("vi");
  useEffect(() => {
    try {
      CourseServices.GetMyCourse()
        .then((res) => {
          console.log(res);
        })
        .catch((e) => console.log(e));
    } catch (err) {
      console.log("ERRR::::", err);
    }
  }, []);
  return (
    <div className={`${styles.wrapper} mt-5 `}>
      {user && (
        <div className="w-100 h-100 row">
          <div className="col-md-6">
            <Card title="Ảnh đại diện">
              {user.avatar && (
                <Image
                  style={{ maxHeight: "30rem" }}
                  alt="avatar"
                  src={`${user!.avatar}`}
                />
              )}
            </Card>
          </div>
          <div className="col-md-6">
            <Card title={"Giới thiệu"}>
              <div>
                <strong className="me-1">Họ và tên:</strong>
                {user.name}
              </div>
              <div className="mt-2">
                <strong className="me-1">Email:</strong>
                {user.email}
              </div>
              <div className="mt-2">
                <strong className="me-1">Đã tham gia:</strong>
                {moment(user.createdAt).fromNow()}
              </div>
            </Card>
            <div className="mt-3">
              <Card title={"Khóa học đã tham gia"}>
                <div>Chưa tham gia khóa học nào</div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThongTinCaNhan;
