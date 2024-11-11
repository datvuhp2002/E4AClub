import React from "react";
import styles from "./Step.module.scss";
import Image from "@/modules/common/components/Image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    number: "1",
    title: [{ title: "ĐĂNG KÝ THẺ" }],
    image: "/svg/step1.svg",
    description: [{ attribute: {}, title: "Truy cập vào" }],
    link: "dang-ky-the",
    linkText: "ĐĂNG KÝ THẺ THƯ VIỆN",
    class: "step1",
  },
  {
    number: "2",
    title: [{ title: "NHẬP THÔNG TIN" }],
    image: "/svg/step2.svg",
    description: [
      { attribute: {}, title: "Bạn đọc nhận được" },
      { attribute: { strong: true }, title: "Mã_đăng_ký" },
      { attribute: {}, title: " sau khi hoàn thành nhập" },
    ],
    link: "",
    class: "step2",
  },
  {
    number: "3",
    title: [{ title: "THANH TOÁN" }],
    image: "/svg/step3.svg",
    description: [
      {
        attribute: {},
        title: "Nộp tiền phí làm thẻ qua",
      },
      {
        attribute: {},
        title: "QR-Code với nội dung",
      },
      {
        attribute: { strong: true },
        title: "Mã_đăng_ký + Họ và tên",
      },
    ],
    link: "",
    class: "step3",
  },
  {
    number: "4",
    title: [{ title: "NHẬN THẺ" }],
    image: "/svg/step4.svg",
    description: [
      {
        attribute: { strong: true },
        title: "Nhận tại Nhà (có cước)",
      },
      {
        attribute: { strong: true },
        title: "Nhận tại Thư viện Quốc gia",
      },
    ],
    link: "",
    class: "step4",
  },
];

const Index = () => {
  return (
    <div>
      <div className={`${styles.container} border p-5 shadow-sm `}>
        <div className={`${styles.container_wrapper} row`}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.container_step} ${styles[`${step.class}`]} col-3 `}
            >
              <div className={`${styles.img_svg_step}`}>
                <Image alt="" src={`${process.env.FILE_URL}${step.image}`} />
              </div>
              <div className={`${styles.link_wrapper} h-100`}>
                <Link href={step.link}>
                  <div className={`${styles.step} text-center p-1`}>
                    <div className={`${styles.step_content}`}>
                      <div className={`${styles.step_number}`}>
                        <div className={styles.inside_number}>
                          <div>BƯỚC</div>
                          <div className={`${styles.number}`}>
                            {step.number}
                          </div>
                        </div>
                      </div>
                      <div className="col h-100 pb-5">
                        <div className="h-25">
                          {step.title.map((item: any, index) => (
                            <h3
                              key={index}
                              className={` ${styles.title} ${styles.text_strong} `}
                              style={{ fontWeight: 700 }}
                            >
                              {item.title}
                            </h3>
                          ))}
                        </div>
                        <div className={styles.body}>
                          {step.description.map((item: any, index) => (
                            <span
                              key={index}
                              className={`${item.attribute.strong ? `fw-bold ${styles.text_strong}` : ""}`}
                            >
                              {item.title}
                            </span>
                          ))}
                          {step.linkText && (
                            <>
                              <div className={styles.icon}>
                                <FontAwesomeIcon
                                  icon={faHandPointDown}
                                  bounce
                                />
                              </div>
                              <h4
                                className={`${styles.link} ${styles.text_strong} mt-2`}
                              >
                                <strong> {step.linkText}</strong>
                              </h4>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.container_mobile}  mt-5`}>
        <div className={`${styles.container_wrapper}`}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.container_step}  ${styles[`${step.class}`]} `}
            >
              <div className={`${styles.img_svg_step}`}>
                <Image alt="" src={`${process.env.FILE_URL}${step.image}`} />
              </div>
              <div className="w-100">
                <Link href={step.link} className="d-flex">
                  <div className={`${styles.step} text-center p-3`}>
                    <div className={`${styles.step_content}`}>
                      <div className={`${styles.step_number}`}>
                        <div className={styles.inside_number}>
                          <div>BƯỚC</div>
                          <div className={`${styles.number}`}>
                            {step.number}
                          </div>
                        </div>
                      </div>
                      <div className="col w-100 ">
                        <div>
                          {step.title.map((item: any, index) => (
                            <h3
                              key={index}
                              className={` ${styles.title} ${styles.text_strong} `}
                              style={{ fontWeight: 700 }}
                            >
                              {item.title}
                            </h3>
                          ))}
                        </div>
                        <div className={styles.body}>
                          {step.description.map((item: any, index) => (
                            <div
                              key={index}
                              className={`${item.attribute.strong ? `fw-bold ${styles.text_strong}` : ""}`}
                            >
                              {item.title}
                            </div>
                          ))}
                          {step.linkText && (
                            <>
                              <div className={styles.icon}>
                                <FontAwesomeIcon
                                  icon={faHandPointDown}
                                  bounce
                                />
                              </div>
                              <h4
                                className={`${styles.link} ${styles.text_strong} mt-2`}
                              >
                                <strong> {step.linkText}</strong>
                              </h4>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
