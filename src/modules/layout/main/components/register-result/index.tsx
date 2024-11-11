"use client";
import React from "react";
import styles from "./RegisterResult.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "@/modules/common/components/Button";
import { useRouter } from "next/navigation";
const Base64Image = ({ base64String }: { base64String: string }) => {
  if (!base64String) return null;
  const getImageSrc = () => `data:image/png;base64,${base64String}`;
  return <img src={getImageSrc()} alt="Generated QR Code" className="w-100" />;
};

const downloadQR = (base64String: string) => {
  const link = document.createElement("a");
  link.href = `data:image/png;base64,${base64String}`;
  link.download = "qrcode.png";
  link.click();
};

interface IRegisterData {
  address?: string;
  cardType?: string;
  cccd?: string;
  dob?: string;
  email?: string;
  fullName?: string;
  gender?: string;
  job?: string;
  nation?: string;
  office?: string;
  photo?: string;
  readerType?: string;
  receiveType?: string;
  registrationCode?: string;
  tel?: string;
}

const RegisterResult = ({
  registerData,
  qrCode,
}: {
  registerData: IRegisterData;
  qrCode: string;
}) => {
  const router = useRouter();
  const handleDivClick = (path: string | undefined) => {
    router.push(`/tra-cuu?mã_đăng_ký=${path}`);
  };

  return (
    <div className={`${styles.register_status} p-4`}>
      <h2 className="text-center text-success fw-bolder my-2">
        Bạn đã gửi đăng ký thành công
      </h2>
      <div className={`${styles.register_code} my-2`}>
        <strong>Mã đăng ký của bạn: </strong>
        <span className="text-danger fw-bold">
          {registerData.registrationCode}
        </span>
      </div>
      <div className="text-center">
        <div className="my-2">Quý khách quét mã QR để thanh toán</div>
        <div className="my-2">
          Với nội dung chuyển khoản là:{" "}
          {registerData.registrationCode && (
            <span className="text-danger fw-bold">
              {`${registerData.registrationCode} ${registerData.fullName?.toString().toUpperCase()}`}
            </span>
          )}
        </div>

        {/* Hiển thị QR Code */}
        <Base64Image base64String={qrCode} />

        <div className="my-2">
          Hoặc vào trang{" "}
          <Button directionLink to="huong-dan">
            Hướng dẫn thanh toán
          </Button>{" "}
          để biết thông tin chi tiết.
        </div>
      </div>

      <div className={`${styles.register_status_action} my-2`}>
        <div>
          <Button
            leftIcon={<FontAwesomeIcon icon={faDownload} />}
            rounded
            research_information
            onClick={() => downloadQR(qrCode)}
          >
            Tải QR
          </Button>
        </div>
        <div className="ms-2">
          {registerData.registrationCode && (
            <Button
              leftIcon={<FontAwesomeIcon icon={faEye} />}
              rounded
              onClick={() => {
                handleDivClick(registerData.registrationCode);
              }}
            >
              Xem thẻ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterResult;
