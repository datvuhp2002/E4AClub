import React, { useEffect } from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`container`}>
        <ul>
          <li>
            <strong>THƯ VIỆN QUỐC GIA VIỆT NAM:</strong>
          </li>
          <li>
            <span>Địa chỉ: Số 31 – Tràng Thi – Hoàn Kiếm - Hà Nội</span>
          </li>
          <li>
            <span>
              Điện thoại: {process.env.NEXT_PUBLIC_FOOTER_PHONE_NUMBER_ADDRESS}{" "}
              (Bộ phận cấp thẻ)
            </span>
          </li>
          <li>
            <span>E-mail: {process.env.NEXT_PUBLIC_FOOTER_EMAIL_ADDRESS}</span>
          </li>
        </ul>
        <div className="d-flex align-items-center justify-content-center">
          <span>
            <span>
              <span>Website: </span>
            </span>
          </span>
          <span>
            <span>
              <Link href={`${process.env.NEXT_PUBLIC_FOOTER_WEBSITE_ADDRESS}`}>
                <span className={`${styles.link} ms-2`}>
                  {process.env.NEXT_PUBLIC_FOOTER_WEBSITE_ADDRESS}
                </span>
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
