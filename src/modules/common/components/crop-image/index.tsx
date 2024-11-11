import { useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "./style.module.css";
import BootstrapIcon from "../bootstrap-icon";
interface Props {
  image: any;
  cropImage: any;
}

const Index = (props: Props) => {
  const cropperRef = useRef<any>();
  const [cropData, setCropData] = useState("#");
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      return cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    }
    return "";
  };
  const XacNhan = () => {
    let data: any = getCropData();
    props.cropImage(data);
  };
  return (
    <>
      {props.image ? (
        <div className="mt-2">
          <Cropper
            className="shadow"
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={props.image ? URL.createObjectURL(props.image) : ""}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
          <hr />
          <div className="text-end">
            <button
              className={styles["fl-button"] + " rounded"}
              onClick={() => {
                XacNhan();
              }}
            >
              <BootstrapIcon iconName="CheckCircleFill" className="mb-1 me-1" />
              Xác nhận
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning fix-alert text-italic">
          Chưa có ảnh được tải lên.
        </div>
      )}
    </>
  );
};
export default Index;
