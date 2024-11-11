import { useEffect, useState } from "react";
import BootstrapIcon from "../../components/bootstrap-icon";
import styles from "./style.module.css";
import { Tab, Tabs } from "react-bootstrap";
import { useToastContext } from "@/lib/context/toast-context";
import { IResponseMessage } from "@/common/models";
// import AccountService from "@/services/account-service";
// import ItemService from "@/services/item-service";

interface Props {}

const Index = (props: Props) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
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
  //   const getData = async () => {
  //     var res: IResponseMessage = await ItemService.Borrowing(UserInfo.CardNo);
  //     if (res.Success) {
  //       if (res.Data && res.Data.length > 0) {
  //         setItem(res.Data);
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   useEffect(() => {
  //     getData();
  //   }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-12 mb-3">
          <h4 className="text-center">Tài liệu đang mượn</h4>
          <hr />
        </div>
      </div>
      <div className="row">
        <div
          className="col-sm-12"
          style={{ overflow: "auto", height: "70vh", display: "block" }}
        >
          <table
            className="table table-bordered table-striped"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  #
                </th>
                <th className="text-center" scope="col">
                  ĐKCB
                </th>
                <th className="text-center" scope="col">
                  Tiêu đề
                </th>
                <th className="text-center" scope="col" style={{ width: 140 }}>
                  Ngày mượn
                </th>
                <th className="text-center" scope="col" style={{ width: 140 }}>
                  Hạn trả
                </th>
                <th className="text-center" scope="col" style={{ width: 130 }}>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {" "}
                  {item && item.length > 0 ? (
                    item.map((e: any, ie) => {
                      return (
                        <tr key={ie}>
                          <td className="text-center">{ie + 1}</td>
                          <td className="text-center">{e.card_no}</td>
                          <td className="text-left">{e.title}</td>
                          <td className="text-center">{e.borrow_date}</td>
                          <td className="text-center">{e.due_date}</td>
                          <td className="text-center">{e.renew_status}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Chưa có dữ liệu.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Index;
