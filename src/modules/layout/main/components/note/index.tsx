import React from "react";
import styles from "./Note.module.scss";

const Note = () => {
  return (
    <div className={`${styles.container} border p-5 shadow-sm `}>
      <div className={`${styles.container_wrapper}`}>
        <p className="mb-0 text-danger">
          <i>
            <u className="me-2">
              <strong> Lưu ý</strong>:
            </u>
            Đối với bạn đọc được hưởng chế độ ưu đãi theo quy định của nhà nước,
            vui lòng làm thẻ trực tiếp tại Phòng cấp thẻ, số 31 - Phố Tràng Thi.
            Khi đi mang theo các giấy tờ liên quan để xác nhận. Thẻ đọc dùng để
            sử dụng các dịch vụ tại Thư viện Quốc gia Việt Nam.
          </i>
        </p>
      </div>
    </div>
  );
};

export default Note;
