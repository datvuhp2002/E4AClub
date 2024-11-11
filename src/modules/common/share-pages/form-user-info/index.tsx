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

  return (
    <>
      <div className="row">
        <div className="col-sm-12 mb-3">
          <h4 className="text-center">Thông tin cá nhân</h4>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Thẻ bản đọc
          </label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.CardNo}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Tài khoản
          </label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.UserName}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Họ và tên
          </label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.FullName}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Ngày cấp
          </label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.IssueDate}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Ngày hết hạn
          </label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.ExpireDate}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Địa chỉ
          </label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.Address}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">
            Email
          </label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.Email}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-sm-3">
          <label className="mb-1 text-secondary fw-bold font-custom">SĐT</label>
        </div>
        <div className="col-sm-9">
          <input
            disabled
            value={UserInfo.Tel}
            type="text"
            className={styles["fl-input"]}
          />
        </div>
      </div>
    </>
  );
};
export default Index;
