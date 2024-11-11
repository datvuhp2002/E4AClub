"use client";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "../../components/Image";

const CollapseInstructionRegisterLibraryCard = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  return (
    <div className="d-flex flex-column">
      {/* Huớng dẫn thanh toán */}
      <Button
        onClick={() => setOpen1(!open1)}
        aria-controls="collapse-text-1"
        aria-expanded={open1}
        className="mt-1 "
        collapse
        leftIcon={<FontAwesomeIcon icon={!open1 ? faPlus : faMinus} />}
      >
        I. Huớng dẫn thanh toán
      </Button>
      <Collapse in={open1}>
        <div id="collapse-text-1">
          <div className="border py-2 px-4 d-flex flex-column align-items-center justify-content-center">
            <label className="mb-3">
              <strong>Quý khách quét mã QR để thanh toán</strong>
            </label>
            <div className="d-flex align-item-center justify-content-center">
              <Image
                src={process.env.FILE_URL + "images/qr0.jpg"}
                alt="qr"
                w30
              />
            </div>
            <div className="w-100 mt-3">
              <div>
                <span className="text-danger fw-bold">
                  Quý khách có thể chọn thanh toán trực tuyến qua chuyển khoản
                  hoặc thanh toán khi nhận thẻ
                </span>
              </div>
              <div className="mb-1">
                <span>Xin lưu ý:</span>
                <ul className="mb-0">
                  <li>Đối với Bạn đọc đăng ký nhận thẻ tại điểm bán thẻ</li>
                  <li>
                    Đối với Bạn đọc thanh toán trực tuyến, bạn chuyển khoản theo
                    mã QR CODE ở trên với nội dung chuyển khoản là{" "}
                    <span className="text-danger fw-bold">mã đăng ký</span> của
                    mình
                    <ul className="mb-0">
                      <li>
                        Vào trang{" "}
                        <Button directionLink to="tra-cuu">
                          Tra cứu thông tin thẻ
                        </Button>
                      </li>
                      <li>
                        Nhập các thông tin: Họ tên, ngày sinh, số điện thoại để
                        xem{" "}
                        <span className="text-danger fw-bold">mã đăng ký</span>{" "}
                        và trạng thái của đơn đăng ký
                      </li>
                      <li>
                        Nếu trạng thái thẻ là{" "}
                        <span className="text-danger fw-bold">
                          Đã được duyệt
                        </span>
                        , xin quý khách vui lòng đến lấy thẻ tại thư viện
                      </li>
                    </ul>
                  </li>
                  <li>
                    Để theo dõi đơn đăng ký của mình, xin quý khách vui lòng vào
                    trang{" "}
                    <Button directionLink href="tra-cuu">
                      Tra cứu thông tin thẻ
                    </Button>{" "}
                    và làm theo hướng dẫn.
                  </li>
                </ul>
              </div>
              <div className="fw-bold text-danger">
                Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của Thư viện
                quốc gia Việt Nam
                <div className="d-flex">
                  <Button directionLink to="/">
                    {" "}
                    Quay về trang chủ
                  </Button>
                  <Button directionLink to="/tra-cuu">
                    Tra cứu thông tin thẻ
                  </Button>
                  <Button directionLink to="/dang-ky-the">
                    Đăng ký thẻ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>

      {/* Collapse 2 */}
      <Button
        onClick={() => setOpen2(!open2)}
        aria-controls="collapse-text-2"
        aria-expanded={open2}
        className="mt-1"
        collapse
        leftIcon={<FontAwesomeIcon icon={!open2 ? faPlus : faMinus} />}
      >
        II. Thủ tục làm thẻ
      </Button>
      <Collapse in={open2}>
        <div id="collapse-text-2">
          <div className="border py-2 px-4 d-flex flex-column align-items-center justify-content-center">
            <div className="w-100 fs-3">
              <div className="2.1 mb-2">
                <span className="fs-3 fw-bold my-1">
                  1.{" "}
                  <span className="text-decoration-underline">
                    Đối tượng được cấp thẻ đọc:
                  </span>
                </span>
                <ul className="mb-0">
                  <li>
                    <div>
                      Tất cả các công dân Việt Nam và người nước ngoài đang lưu
                      trú tại Việt Nam có CHỨNG MINH THƯ (HOẶC HỘ CHIẾU).
                    </div>
                  </li>
                </ul>
              </div>
              <div className="2.2 mb-2">
                <span className=" fw-bold my-1">
                  2.{" "}
                  <span className="text-decoration-underline">
                    Điều kiện làm thẻ trong thư viện:
                  </span>
                </span>
                <ul className="mb-0">
                  <li>
                    <div>
                      Mang theo Chứng minh thư hoặc Hộ chiếu (Xin lưu lý bạn đọc
                      không cần mang theo ảnh, ảnh sẽ được chụp trực tiếp khi
                      đến làm thẻ)
                    </div>
                  </li>
                </ul>
              </div>
              <div className="2.3 mb-2">
                <span className="fw-bold my-1">
                  3.{" "}
                  <span className="text-decoration-underline">
                    Thời gian nhận lại thẻ đọc:
                  </span>
                </span>
                <ul className="mb-0">
                  <li>
                    <div>
                      Bạn đọc có thể nhận lại thẻ 5-10 phút sau khi khai form
                      thông tin người làm thẻ
                    </div>
                  </li>
                </ul>
              </div>
              <div className="2.4 mb-2">
                <span className="fw-bold my-1">
                  4. <span className="text-decoration-underline">Lệ phí</span>
                </span>
                <ul className="mb-0">
                  <li>
                    <span className="fst-italic">
                      {" "}
                      (Áp dụng cho cả việc cấp thẻ mới và đổi thẻ đã hết hạn):
                    </span>
                  </li>
                  <li>
                    <div>
                      Đối với cá nhân là người Việt Nam hoặc người nước ngoài
                      sống và làm việc tại Việt Nam: <strong>120.000đ</strong>
                      <i>(Một trăm hai mươi nghìn đồng)</i>/thẻ/năm (12 tháng)
                    </div>
                  </li>
                  <li>
                    <div>
                      Đối với cán bộ hưu trí: <strong>50.000đ</strong>{" "}
                      <i>(Năm mươi nghìn đồng)</i>
                      /thẻ/năm (12 tháng)
                    </div>
                  </li>
                  <li>
                    <div>
                      Thẻ đọc dành cho Nhà nghiên cứu và Doanh nhân{" "}
                      <i>(thẻ vàng)</i>: Thẻ đọc dành cho Nhà nghiên cứu và
                      Doanh nhân <i>(thẻ vàng)</i>:{" "}
                      <strong>Loại 1 năm: 120.000đ</strong> Thẻ đọc dành cho Nhà
                      nghiên cứu và Doanh nhân <i>(thẻ vàng)</i>:{" "}
                      <i>(Một trăm hai mươi nghìn đồng) </i>+ 540.000đ lệ phí
                      tham gia Câu lạc bộ Nhà nghiên cứu - Doanh Nhân{" "}
                      <Button directionLink to="">
                        [Xem thêm]
                      </Button>
                      .
                    </div>
                  </li>
                  <li>
                    <div>
                      Thẻ Thư viện Văn hóa Thiếu nhi: 40.000đ/thẻ/năm (12 tháng)
                      <Button
                        directionLink
                        to="https://nlv.gov.vn/tro-giup-ban-doc/thu-tuc-lam-the-thu-vien-van-hoa-thieu-nhi.html"
                      >
                        [Xem thêm]
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="2.5 mb-2">
                <span className="fw-bold my-1">
                  5.{" "}
                  <span className="text-decoration-underline">
                    Những trường hợp được miễn lệ phí làm thẻ thư viện:
                  </span>
                </span>
                <ul className="mb-0">
                  <li>
                    <div>
                      Miễn phí làm thẻ với các đối tượng được hưởng chính sách
                      ưu đãi – hưởng thụ văn hóa, được qui định tại điều 2,
                      quyết định số{" "}
                      <Button
                        directionLink
                        to="https://chinhphu.vn/default.aspx?pageid=27160&docid=12166"
                      >
                        170/2003/QĐ-TTg
                      </Button>{" "}
                      ngày 14/8/2003 của Thủ tướng chính phủ, Thư viện Quốc gia
                      Việt Nam không thu phí Thẻ bạn đọc.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="2.6 mb-2">
                <span className="fw-bold my-1">
                  6.{" "}
                  <span className="text-decoration-underline">
                    Thời gian làm việc:
                  </span>
                </span>
                <ul className="mb-0">
                  <li>
                    <div>Sáng: từ 8h00 đến 11h30</div>
                  </li>
                  <li>
                    <div>Chiều: từ 13h30 đến 16h30</div>
                  </li>
                  <li>
                    <div>
                      Từ thứ 2 đến thứ 7 hàng tuần (trừ các ngày nghỉ lễ quốc
                      gia, và ngày nội dịch theo qui định TVQG{" "}
                      <Button
                        directionLink
                        to="https://opac.nlv.gov.vn:8055/tro-giup-ban-doc/login.aspx?url=/tro-giup-ban-doc/lich-phuc-vu.html"
                      >
                        [Chi tiết lịch phục vụ]
                      </Button>{" "}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="2.6 mb-2">
                <span className="fw-bold my-1">
                  7.{" "}
                  <span className="text-decoration-underline">
                    Liên hệ trực tiếp bộ phận cấp thẻ:
                  </span>
                </span>
                <ul className="mb-0">
                  <li>
                    <div>Bộ phận cấp thẻ TVQG</div>
                  </li>
                  <li>
                    <div>Địa chỉ: Số 31 Tràng Thi - Hoàn Kiếm - Hà Nội </div>
                  </li>
                  <li>
                    <div>Số điện thoại: 024 – 38254938</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Collapse>

      {/* Collapse 3 */}
      <Button
        onClick={() => setOpen3(!open3)}
        aria-controls="collapse-text-3"
        aria-expanded={open3}
        className="mt-1"
        collapse
        leftIcon={<FontAwesomeIcon icon={!open3 ? faPlus : faMinus} />}
      >
        III. Thủ tục làm thẻ Thư viện Văn hóa Thiếu nhi
      </Button>
      <Collapse in={open3}>
        <div id="collapse-text-3">
          <div className="border py-2 px-4 d-flex flex-column align-items-center justify-content-center">
            <div className="w-100 fs-3">
              <div className="mb-2">
                <strong>Thủ tục làm thẻ Thư viện Văn hóa Thiếu nhi:</strong>
                <ol className="mb-0">
                  <li>Giấy khai sinh (đối chiếu)</li>
                  <li>Lệ phí 40.000đ/thẻ/năm</li>
                  <li>Đưa trẻ đến khai hồ sơ và chụp ảnh</li>
                </ol>
              </div>
              <div className="mb-2">
                <strong>Chú ý: </strong>Đối với trẻ từ 3-5 tuổi: làm thẻ cặp
                80.000đ/02 thẻ (Thẻ cho con và thẻ người giám hộ).
              </div>
              <div className="mb-2">
                <strong>Giờ làm thẻ:</strong>
                <ul className="mb-0">
                  <li>Từ thứ Hai đến thứ Bảy</li>
                  <li>Sáng: Từ 8h00' - 11h30'</li>
                  <li>Chiều: Từ 13h30' - 16h30'</li>
                </ul>
              </div>
              <div className="mb-2">
                <strong>
                  Chi tiết, vui lòng liên hệ trực tiếp bộ phận cấp thẻ:
                </strong>
                <ul>
                  <li>Bộ phận cấp thẻ TVQG</li>
                  <li>Địa chỉ: Số 31 Tràng Thi - Hoàn Kiếm - Hà Nội</li>
                  <li>Số điện thoại: 024 – 38254938</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Collapse>

      {/* Collapse 4 */}
      <Button
        onClick={() => setOpen4(!open4)}
        aria-controls="collapse-text-4"
        aria-expanded={open4}
        className="mt-1"
        collapse
        leftIcon={<FontAwesomeIcon icon={!open4 ? faPlus : faMinus} />}
      >
        IV. Nội quy thư viện
      </Button>
      <Collapse in={open4}>
        <div id="collapse-text-4">
          <div className="border py-2 px-4 d-flex flex-column align-items-center justify-content-center">
            <div className="w-100 fs-3">
              <strong>
                Bạn đọc đến đọc sách, ngoài việc chấp hành các quy định chung
                của thư viện cần thực hiện các quy định sau đây:
              </strong>
              <ul>
                <li>
                  Không mang túi xách, cặp, sách, báo – tạp chí in vào phòng đọc
                  (chấp nhận sách, báo dạng photocopy)
                </li>
                <li>
                  Xuất trình thẻ đọc, chứng minh thư, giấy giới thiệu tại bộ
                  phận thủ thư
                </li>
                <li>
                  Chỉ đọc tại chỗ, không mang tài liệu ra khỏi phòng đọc, ra
                  ngoài thư viện
                </li>
                <li>
                  Không cắt xén, xé trang tài liệu, khi phát hiện sách thiếu
                  trang, yêu cầu báo ngay cho thủ thư, nếu không bạn đọc hoàn
                  toàn chịu trách nhiệm
                </li>
                <li>
                  Bạn đọc nào vi phạm nội quy, tùy từng mức độ sẽ có hình thức
                  xử lý thích hợp: thu thẻ đọc, bồi thường, thông báo về cơ
                  quan, trường học…hoặc truy tố trước pháp luật Không hút thuốc,
                  chất dễ cháy nổ vào phòng đọc, giữ gìn vệ sinh chung
                </li>
                <li>
                  Không nói chuyện riêng, không nghe điện thoại tại phòng đọc,
                  yêu cầu điện thoại để chế độ rung
                </li>
                <li>
                  Khi có nhu cầu photocopy tài liệu, cần liên hệ với thủ thư để
                  được chỉ dẫn cụ thể.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Collapse>

      {/* Video huớng dẫn*/}
      <Button
        onClick={() => setOpen5(!open5)}
        aria-controls="collapse-text-4"
        aria-expanded={open5}
        className="mt-1"
        collapse
        leftIcon={<FontAwesomeIcon icon={!open5 ? faPlus : faMinus} />}
      >
        V. VIDEO HƯỚNG DẪN
      </Button>
      <Collapse in={open5}>
        <div id="collapse-text-5">
          <div className="border  p-4">
            <div className=" d-flex flex-column align-items-center justify-content-center">
              <iframe
                width="50%"
                height="250"
                src="https://www.youtube.com/embed/r_9aD7Oj8RM?si=5aAPnzXQS02h-pjq"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseInstructionRegisterLibraryCard;
