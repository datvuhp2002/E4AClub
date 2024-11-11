import { useState } from "react";
import BootstrapIcon from "../../components/bootstrap-icon";
import styles from "./style.module.css";
import { Tab, Tabs } from "react-bootstrap";
import { useToastContext } from "@/lib/context/toast-context";
import { IResponseMessage } from "@/common/models";
// import AccountService from "@/services/account-service";

interface Props {}

const Index = (props: Props) => {
  const [userChangePassword, setUserChangePassword] = useState<any>({
    LoginName: "",
    NewPassword: "",
    OldPassword: "",
  });
  const { HandleOpenToast } = useToastContext();
  const GetUserInfo = () => {
    let userInfo = null;
    if (typeof window !== "undefined") {
      userInfo = sessionStorage.getItem("OUserInfo");
    }
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  };
  const UserInfo = GetUserInfo();
  //   const HandleChangePassword = async () => {
  //     userChangePassword.LoginName = UserInfo.UserName;
  //     if (!userChangePassword.LoginName) {
  //       HandleOpenToast({ type: "warning", content: "Tài khoản Chưa có !" });
  //       return;
  //     }
  //     if (!userChangePassword.OldPassword) {
  //       HandleOpenToast({
  //         type: "warning",
  //         content: "Mật khẩu cũ không được để trống !",
  //       });
  //       return;
  //     }
  //     if (!userChangePassword.NewPassword) {
  //       HandleOpenToast({
  //         type: "warning",
  //         content: "Mật khẩu mới không được để trống !",
  //       });
  //       return;
  //     }
  //     var res: IResponseMessage = await AccountService.ChangePasswordAsync(
  //       userChangePassword
  //     );
  //     if (res.Success) {
  //       if (!res.Data) {
  //         HandleOpenToast({
  //           type: "error",
  //           content: "Thay đổi mật khẩu thất bại !",
  //         });
  //         return;
  //       }
  //       HandleOpenToast({
  //         type: "success",
  //         content: "Thay đổi mật khẩu thành công !",
  //       });
  //     } else {
  //       HandleOpenToast({
  //         type: "error",
  //         content: "Thay đổi mật khẩu thất bại !",
  //       });
  //     }
  //   };
  const onChangePassword = (value: any, name: any) => {
    setUserChangePassword({
      ...userChangePassword,
      [name]: value,
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-12 mb-3">
          <h4 className="text-center">Đổi mật khẩu</h4>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Tài khoản
          </label>
        </div>
        <div className="col-sm-9">
          <h5>{UserInfo.UserName}</h5>
        </div>
      </div>
      <div className="row mt">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Mật khẩu cũ <span className="required">*</span>
          </label>
        </div>
        <div className="col-sm-9">
          <input
            onChange={(e) => {
              onChangePassword(e.target.value, "OldPassword");
            }}
            value={userChangePassword.OldPassword}
            type="password"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Mật khẩu mới <span className="required">*</span>
          </label>
        </div>
        <div className="col-sm-9">
          <input
            onChange={(e) => {
              onChangePassword(e.target.value, "NewPassword");
            }}
            value={userChangePassword.NewPassword}
            type="password"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-5 px-5 margin-auto">
          <button
            className={styles["fl-button"] + " rounded p-2"}
            // onClick={() => {
            //   HandleChangePassword();
            // }}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </>
  );
};
export default Index;
