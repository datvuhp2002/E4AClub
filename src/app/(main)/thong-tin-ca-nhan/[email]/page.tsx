"use client";
import React, { useEffect, useState } from "react";
import styles from "./ThongTinCaNhan.module.scss";
import UserServices from "@/services/user-services";
import Image from "@/modules/common/components/Image";
import Card from "@/modules/common/components/Card";
import moment from "moment";
import "moment/locale/vi";
const ThongTinCaNhan = () => {
  const [profile, setProfile] = useState<IUser>();
  moment.locale("vi");
  useEffect(() => {
    try {
      UserServices.Info().then((res) => {
        setProfile(res.user);
      });
    } catch (err) {
      console.log("ERRR::::", err);
    }
  }, []);
  return (
    <div className={`${styles.wrapper} mt-5 `}>
      {profile && (
        <div className="w-100 h-100 row">
          <div className="col-md-6">
            <Card title="Ảnh đại diện">
              <Image
                alt="avatar"
                src={`${process.env.API_URL}/${profile?.avatar}`}
              />
            </Card>
          </div>
          <div className="col-md-6">
            <Card title={"Giới thiệu"}>
              <div>
                <strong className="me-1">Họ và tên:</strong>
                {profile.name}
              </div>
              <div className="mt-2">
                <strong className="me-1">Email:</strong>
                {profile.email}
              </div>
              <div className="mt-2">
                <strong className="me-1">Đã tham gia:</strong>
                {moment(profile.createdAt).fromNow()}
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
