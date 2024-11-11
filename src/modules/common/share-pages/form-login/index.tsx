import { useEffect, useState } from "react";
import BootstrapIcon from "../../components/bootstrap-icon";
import styles from "./style.module.css";
import { IResponseMessage } from "@/common/models";
// import AccountService from "@/services/account-service";
import { useToastContext } from "@/lib/context/toast-context";
import { useModalContext } from "@/lib/context/modal-context";
import { useAppContext } from "@/lib/context/app-context";
import { EventType, IUserLogin, SendEventLog } from "@/common/eventlog";

interface Props {
  redirectLink?: any;
}

const Index = (props: Props) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [formLogin, setFormLogin] = useState({ UserName: "", Password: "" });
  const { HandleOpenToast } = useToastContext();
  const { setShowModal } = useModalContext();
  const { setIsAuthenticated } = useAppContext();
  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);

  //   // cleanup this component
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // });
  // const handleKeyDown = (event: any) => {
  //   if (event.keyCode == 13) {
  //     if (isInputFocused) {
  //       HandleLogin();
  //     }
  //   }
  // };
  //   const HandleLogin = async () => {
  //     if (!formLogin.UserName) {
  //       HandleOpenToast({
  //         type: "warning",
  //         content: "Tài khoản không được để trống !",
  //       });
  //       return;
  //     }
  //     if (!formLogin.Password) {
  //       HandleOpenToast({
  //         type: "warning",
  //         content: "Mật khẩu không được để trống !",
  //       });
  //       return;
  //     }
  //     var res: IResponseMessage = await AccountService.LoginAsync(formLogin);
  //     if (res.Success) {
  //       HandleOpenToast({ type: "success", content: "Đăng nhập thành công !" });
  //       let userInfo = { ...res.Data };
  //       delete userInfo.AccessToken;
  //       if (typeof window !== "undefined") {
  //         sessionStorage.setItem("OToken", res.Data.AccessToken);
  //         sessionStorage.setItem("OUserInfo", JSON.stringify(userInfo));
  //       }
  //       setShowModal(false);
  //       setIsAuthenticated(true);
  //       var userLogin: IUserLogin = {
  //         UserName: userInfo.UserName,
  //       };
  //       if (props.redirectLink) {
  //         window.location.href = props.redirectLink;
  //       }
  //       SendEventLog(EventType.UserLogin, userLogin);
  //     } else {
  //       HandleOpenToast({ type: "error", content: res.Message });
  //     }
  //   };
  const OnChange = (prop: any, value: any) => {
    setFormLogin({
      ...formLogin,
      [prop]: value,
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-12 mb-3">
          <div
            className={
              styles["fl-icon"] +
              " d-flex align-items-center justify-content-center"
            }
          >
            <BootstrapIcon iconName="Person" />
          </div>
        </div>
        <div className="col-sm-12 px-5 mb-4">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Tài khoản
          </label>
          <input
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={(e) => {
              OnChange("UserName", e.target.value);
            }}
            value={formLogin.UserName}
            type="text"
            className={styles["fl-input"]}
            placeholder="Nhập tài khoản của bạn"
          />
        </div>
        <div className="col-sm-12 px-5 mb-4">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Mật khẩu
          </label>
          <input
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={(e) => {
              OnChange("Password", e.target.value);
            }}
            value={formLogin.Password}
            type="password"
            className={styles["fl-input"]}
            placeholder="Nhập mật khẩu của bạn"
          />
        </div>
        <div className="col-sm-12 px-5 mb-4">
          <button
            className={styles["fl-button"] + " rounded p-2"}
            // onClick={() => {
            //   HandleLogin();
            // }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </>
  );
};
export default Index;
