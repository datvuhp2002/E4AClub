import React from "react";
import styles from "./ResearchResult.module.scss";
import LibraryCard from "@/modules/common/components/library-card";

const ResearchResult = ({ researchResult }: { researchResult: any }) => {
  return (
    <>
      <div className={`${styles.result} w-100 `}>
        <h2 className="pt-4 text-center">
          <strong>KẾT QUẢ TRA CỨU</strong>
        </h2>
        <div className={`${styles.status}`}>
          <div className="mb-3">
            <div>
              <span>
                <strong>
                  Mã đăng ký:
                  <span className="ms-2 text-danger">
                    {researchResult?.coderegister}
                  </span>
                </strong>
              </span>
            </div>
            <div>
              <strong>
                Tình trạng xử lý:{" "}
                <span className="text-primary">{researchResult?.status}</span>
              </strong>
            </div>
            <div>
              {researchResult?.ispayment ? (
                <strong className="text-success">
                  Bạn đã thanh toán chi phí làm thẻ.
                </strong>
              ) : (
                <span className="text-danger">
                  Bạn chưa thanh toán chi phí làm thẻ!
                </span>
              )}
            </div>
          </div>
        </div>
        <LibraryCard researchResult={researchResult} />
      </div>
    </>
  );
};

export default ResearchResult;
