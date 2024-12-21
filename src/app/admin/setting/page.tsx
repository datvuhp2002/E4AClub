"use client";
import React, { useEffect, useState } from "react";
import styles from "./Setting.module.scss";
import Card from "@/modules/common/components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/modules/common/components/Button";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "@/modules/common/components/Image";
import ThemeToggle from "@/modules/common/components/theme-toggle";
import UserServices from "@/services/user-services";
import { Skeleton } from "@mui/material";
import { useModalContext } from "@/lib/context/modal-context";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/modules/common/components/input-field";
import { useToastContext } from "@/lib/context/toast-context";

const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IUpdateUser>();
  const [userData, setUserData] = useState<any>();
  const { HandleOpenModal, HandleCloseModal } = useModalContext();
  const { HandleOpenToast } = useToastContext();
  const handleSuccessToast = (message: string) => {
    HandleOpenToast({
      type: "success",
      content: message,
    });
  };
  const handleErrorToast = (message: string) => {
    HandleOpenToast({
      type: "error",
      content: `${message}! Vui lòng thử lại`,
    });
  };
  const handleOpenModalName = () => {
    HandleOpenModal({
      title: "Cập nhật họ và tên",
      body: (
        <div className="d-flex flex-column">
          <InputField
            name="name"
            register={register}
            validation={{
              required: "Họ và tên là bắt buộc",
              validate: {
                twoWords: (value: string) =>
                  value.trim().split(" ").length >= 2 ||
                  "Họ và tên phải có ít nhất 2 từ",
              },
              maxLength: {
                value: 254,
                message: "Họ và tên có tối đa 254 ký tự",
              },
            }}
            onInput={(e) => {
              e.target.value = e.target.value
                .toLowerCase()
                .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
            }}
            placeholder="Họ và tên"
            errors={errors}
          />
        </div>
      ),
      footer: (
        <div className="d-flex">
          <Button
            success_btn
            rounded
            onClick={handleSubmit(handleSubmitUpdateUser)}
          >
            Cập nhật
          </Button>
          <Button
            edit_btn
            rounded
            onClick={() => {
              setValue("name", userData.name);
              HandleCloseModal();
            }}
          >
            Hủy
          </Button>
        </div>
      ),
    });
  };
  const handleOpenModalChangePassword = () => {
    HandleOpenModal({
      title: "Thay mật khẩu",
      body: (
        <div className="d-flex flex-column">
          <div>
            <InputField
              name="oldPassword"
              type="password"
              register={register}
              placeholder="Mật khẩu cũ"
              errors={errors}
            />
          </div>
          <div className="mt-2">
            <InputField
              name="newPassword"
              type="password"
              register={register}
              placeholder="Mật khẩu mới"
              errors={errors}
            />
          </div>
          <div className="mt-2">
            <InputField
              name="checkNewPassword"
              type="password"
              register={register}
              placeholder="Nhập lại mật khẩu"
              errors={errors}
            />
          </div>
        </div>
      ),
      footer: (
        <div className="d-flex">
          <Button
            success_btn
            rounded
            onClick={handleSubmit(handleSubmitUpdateUserPassword)}
          >
            Cập nhật
          </Button>
          <Button
            edit_btn
            rounded
            onClick={() => {
              setValue("oldPassword", "");
              setValue("newPassword", "");
              setValue("checkNewPassword", "");
              HandleCloseModal();
            }}
          >
            Hủy
          </Button>
        </div>
      ),
    });
  };
  const handleSubmitUpdateUser: SubmitHandler<ICreateUserDto> = async (
    data
  ) => {
    try {
      const result = await UserServices.CreateUser(data);
      if (result && result.success) {
        handleSuccessToast("Cập nhật người dùng thành công");
        HandleCloseModal();
      } else {
        handleErrorToast("Cập nhật người dùng thất bại");
      }
    } catch (err) {
      console.error(err);
      handleErrorToast("Cập nhật người dùng thất bại");
    }
  };
  const validatePasswordChange = (data: IUpdateUser) => {
    const { oldPassword, newPassword, checkNewPassword } = data || {};

    // Common validation for password fields
    const validateField = (field: string | null, fieldName: string) => {
      if (!field) {
        handleErrorToast(`${fieldName} không được để trống`);
        return false;
      }
      if (field.length < 6) {
        handleErrorToast(`${fieldName} phải có ít nhất 6 ký tự`);
        return false;
      }
      return true;
    };

    // Validate individual fields
    if (
      !validateField(oldPassword, "Mật khẩu cũ") ||
      !validateField(newPassword, "Mật khẩu mới") ||
      !validateField(checkNewPassword, "Xác nhận mật khẩu mới")
    ) {
      return;
    }

    // Check logical conditions
    if (oldPassword === newPassword) {
      handleErrorToast("Mật khẩu cũ và mật khẩu mới không được giống nhau");
      return;
    }
    if (newPassword !== checkNewPassword) {
      handleErrorToast("Mật khẩu không giống nhau");
      return;
    }

    return true;
  };

  const handleSubmitUpdateUserPassword: SubmitHandler<IUpdateUser> = async (
    data
  ) => {
    // try {
    console.log(data);
    if (!validatePasswordChange(data)) {
      return;
    }
    // validate password

    //   const result = await UserServices.CreateUser(data);
    //   if (result && result.success) {
    //     handleSuccessToast("Cập nhật người dùng thành công");
    //     HandleCloseModal();
    //   } else {
    //     handleErrorToast("Cập nhật người dùng thất bại");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   handleErrorToast("Cập nhật người dùng thất bại");
    // }
  };

  useEffect(() => {
    UserServices.Info()
      .then((res) => {
        setUserData(res.user);
        setValue("name", res.user.name);
      })
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
                  onClick={handleOpenModalName}
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
                onClick={() => handleOpenModalChangePassword()}
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
