"use client";
import React, { useEffect, useState } from "react";
import styles from "./ThongTinCaNhan.module.scss";
import UserServices from "@/services/user-services";
import Image from "@/modules/common/components/Image";
import Card from "@/modules/common/components/Card";
type User = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  roles: string;
  createdAt: string;
};

const ThongTinCaNhan = () => {
  const [profile, setProfile] = useState<User>();
  useEffect(() => {
    try {
      UserServices.Info().then((res) => {
        console.log(res);
        setProfile(res);
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
                <strong className="me-1">Email:</strong>
                {profile.email}
              </div>
              <div className="mt-2">
                <strong className="me-1">Email:</strong>
                {profile.email}
              </div>
            </Card>
            <div className="mt-3">
              <Card title={"Khóa học đã tham gia"}>
                <div>{profile.email}</div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThongTinCaNhan;
