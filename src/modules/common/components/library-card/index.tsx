import React from "react";
import styles from "./LibraryCard.module.scss";
import Image from "../Image";
import formatDateTime from "@/common/format_date";

const LibraryCard = ({ researchResult, custom }: any) => {
  const { fullname, office, createddate, photo } = researchResult;

  const displayDate = (date: string) => formatDateTime.formatDate(date);

  const expiryDate = (date: string) =>
    formatDateTime.formatDatePlusOneYear(date);

  const renderInfoRow = (label: string, subLabel: string, value: any) => (
    <div className="row mb-1">
      <div className="col">
        <div className="fs-5">
          <strong>{label}:</strong>
        </div>
        <div className="fs-5">{subLabel}</div>
      </div>
      <div className="col-7">
        <span className={`${styles.value}`}>{value}</span>
      </div>
    </div>
  );

  return (
    <div className={`${styles.library_card} ${custom}`}>
      <div className={`${styles.library_card_header} p-3`}>
        <h4>
          <strong>THƯ VIỆN QUỐC GIA VIỆT NAM</strong>
        </h4>
        <div className={styles.library_card_header_el_title}>
          <strong>NATIONAL LIBRARY OF VIETNAM</strong>
        </div>
      </div>

      <div className={`${styles.library_card_body} p-3`}>
        <div className="row">
          <div className="col">
            <Image alt="ảnh thẻ" src={`${process.env.FLIPBOOK_URL}${photo}`} />
          </div>

          <div className="col-7">
            <div className="fs-4 text-center mb-2">
              <strong>Thẻ bạn đọc</strong>
            </div>

            <div className="text-start">
              {renderInfoRow("Họ tên", "Full name", fullname)}
              {renderInfoRow("Đơn vị", "Institution", office)}

              {createddate &&
                renderInfoRow(
                  "Ngày cấp",
                  "Date of issue",
                  displayDate(createddate)
                )}

              {createddate &&
                renderInfoRow(
                  "Hết hạn",
                  "Date of expiry",
                  expiryDate(createddate)
                )}
              {renderInfoRow("Mã thẻ", "Card code", "")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
