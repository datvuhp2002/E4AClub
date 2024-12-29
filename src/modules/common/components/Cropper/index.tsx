"use client";
import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Popover, OverlayTrigger } from "react-bootstrap";
import {
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faArrowRotateLeft,
  faArrowRotateRight,
  faLeftRight,
  faUpDown,
  faRepeat,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";
import styles from "./Cropper.module.scss";
import Image from "../Image";

// Define props interface
interface ImageCropperModalProps {
  onImageCrop: (croppedImage: any) => void; // Callback to handle cropped image
  setError: any;
  clearErrors: any;
  errors: any;
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  onImageCrop,
  setError,
  clearErrors,
  errors,
}) => {
  const [image, setImage] = useState<string>(
    `${process.env.FILE_URL}/images/huongdancatanh.png`
  );
  const [fileName, setFileName] = useState<string>("");

  const [croppedImage, setCroppedImage] = useState<string | null>(null); // Cropped image
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility
  const cropperRef = useRef<any>(null); // Cropper reference
  const [scaleX, setScaleX] = useState<number>(1); // Flip X axis state
  const [scaleY, setScaleY] = useState<number>(1); // Flip Y axis state
  const [isSelectedImg, SetIsSelectedImg] = useState<boolean>(false);
  // Handle flipping the image horizontally
  const handleFlipX = () => {
    const newScaleX = scaleX === 1 ? -1 : 1;
    setScaleX(newScaleX);
    cropperRef.current?.cropper?.scaleX(newScaleX);
  };

  // Handle flipping the image vertically
  const handleFlipY = () => {
    const newScaleY = scaleY === 1 ? -1 : 1;
    setScaleY(newScaleY);
    cropperRef.current?.cropper?.scaleY(newScaleY);
  };

  // Reset cropper and flip values
  const handleReset = () => {
    cropperRef.current?.cropper?.reset();
    setScaleX(1);
    setScaleY(1);
  };

  // Handle image selection from file input
  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(file.type)) {
        setError("photo", {
          type: "invalid",
          message: "Vui lòng chọn một file hình ảnh (JPEG, PNG, GIF, WEBP).",
        });
        setIsModalOpen(false);
        return;
      } else {
        clearErrors("photo");
      }

      // if (file.size > 200 * 1024) {
      //   setError("photo", {
      //     type: "invalid",
      //     message: "File không được lớn hơn 200KB.",
      //   });
      //   setIsModalOpen(false);
      //   return;
      // } else {
      //   clearErrors("photo");
      // }
      console.log(file.name);
      setFileName(file.name);
      SetIsSelectedImg(true);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cropping the image
  const handleCrop = () => {
    const croppedCanvas = cropperRef.current?.cropper?.getCroppedCanvas({
      width: 300,
      height: 400,
    });

    if (croppedCanvas) {
      const croppedDataUrl = croppedCanvas.toDataURL();

      // Sử dụng fileName từ state ngay tại đây
      const currentFileName = fileName || "default.png";

      // Chuyển đổi Data URL thành File
      fetch(croppedDataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const croppedImageFile = new File([blob], currentFileName, {
            type: blob.type,
          });
          console.log("Cropped file name:", currentFileName); // Kiểm tra file name
          setCroppedImage(croppedDataUrl);
          onImageCrop(croppedImageFile);
          setIsModalOpen(false);
        });
    }
  };
  // Popover content to preview the cropped image
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Hình ảnh đã tải lên</Popover.Header>
      <Popover.Body>
        {croppedImage ? (
          <Image src={croppedImage} alt="Cropped" style={{ width: "100%" }} />
        ) : (
          "Chưa có hình ảnh nào được tải lên."
        )}
      </Popover.Body>
    </Popover>
  );
  const imageSamplePopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Ảnh mẫu</Popover.Header>
      <Popover.Body>
        <img
          src={`${process.env.FILE_URL}/svg/anhthe.svg`}
          alt="Cropped"
          style={{ width: "100%" }}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {/* Input showing selected file name */}
      <div className="w-100 d-flex align-items-center justify-content-center">
        {croppedImage && (
          <img
            src={croppedImage}
            alt="Cropped"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
        )}
      </div>
      <div className="mb-3 row">
        <div className="col-10">
          <div className="d-flex ">
            <Input
              name="photo"
              value={fileName}
              leftIcon={<FontAwesomeIcon icon={faImage} />}
              readOnly
              placeholder="Chọn hình ảnh"
              cropper
              errors={errors}
            />
            {/* Button to show popover with the cropped image */}
            {croppedImage && (
              <OverlayTrigger
                trigger={["hover", "focus"]}
                placement="right"
                overlay={popover}
              >
                <Button
                  variant="outline-secondary"
                  className={`${styles.see_image_button}`}
                >
                  Xem ảnh
                </Button>
              </OverlayTrigger>
            )}
            {/* Button to open modal for cropping */}
            <button
              className={`${styles.select_image_button}`}
              onClick={() => setIsModalOpen(true)}
            >
              chọn
            </button>
          </div>
        </div>
        <div className="col-2 ">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="left"
            overlay={imageSamplePopover}
          >
            <p className={`${styles.sample_img} m-0`}>Ảnh mẫu</p>
          </OverlayTrigger>
        </div>
      </div>

      {/* Modal for cropping the image */}
      <Modal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            aspectRatio={3 / 4} // Aspect ratio 3:4
            guides={false}
            ref={cropperRef}
          />
        </Modal.Body>
        <Modal.Footer className="w-100 justify-content-between">
          <div className={`${styles.action} d-flex align-items-center`}>
            {/* Button to upload a new image */}
            <div className={`${styles.btn_group}`}>
              <Button as="label" htmlFor="fileInput">
                Tải ảnh
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={onSelectImage}
                  accept="image/*"
                />
              </Button>
            </div>
            {/* Cropper controls */}
            <div className={`${styles.btn_group}`}>
              <Button
                className={`${styles.btn_left} ${styles.border_right}`}
                onClick={() => cropperRef.current?.cropper?.zoom(0.1)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
              </Button>
              <Button
                className={`${styles.btn_right}`}
                onClick={() => cropperRef.current?.cropper?.zoom(-0.1)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
              </Button>
            </div>
            <div className={`${styles.btn_group}`}>
              <Button
                className={`${styles.btn_left} ${styles.border_right}`}
                onClick={() => cropperRef.current?.cropper?.move(-10, 0)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Button
                className={`${styles.btn_middle} ${styles.border_right}`}
                onClick={() => cropperRef.current?.cropper?.move(10, 0)}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
              <Button
                className={`${styles.btn_middle} ${styles.border_right}`}
                onClick={() => cropperRef.current?.cropper?.move(0, -10)}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </Button>
              <Button
                className={`${styles.btn_right}`}
                onClick={() => cropperRef.current?.cropper?.move(0, 10)}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </Button>
            </div>
            <div className={`${styles.btn_group}`}>
              <Button
                className={`${styles.btn_left} ${styles.border_right}`}
                onClick={() => cropperRef.current?.cropper?.rotate(-45)}
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} />
              </Button>
              <Button
                className={`${styles.btn_right}`}
                onClick={() => cropperRef.current?.cropper?.rotate(45)}
              >
                <FontAwesomeIcon icon={faArrowRotateRight} />
              </Button>
            </div>
            <div className={`${styles.btn_group}`}>
              <Button
                className={`${styles.btn_left} ${styles.border_right}`}
                onClick={handleFlipX}
              >
                <FontAwesomeIcon icon={faLeftRight} />
              </Button>
              <Button className={`${styles.btn_right}`} onClick={handleFlipY}>
                <FontAwesomeIcon icon={faUpDown} />
              </Button>
            </div>
            <div className={`${styles.btn_group}`}>
              <Button className={`${styles.btn_rounded}`} onClick={handleReset}>
                <FontAwesomeIcon icon={faRepeat} />
              </Button>
            </div>
          </div>
          <div className={`${styles.btn_group}`}>
            <Button onClick={handleCrop} disabled={!isSelectedImg}>
              Hoàn thành
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageCropperModal;
