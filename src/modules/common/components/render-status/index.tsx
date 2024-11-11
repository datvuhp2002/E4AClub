export function getStatusElement(status: string) {
  switch (status) {
    case "Duyệt đăng ký":
    case "1":
      return <span className="text-primary">Duyệt đăng ký</span>;

    case "Hoàn thành cấp thẻ":
    case "2":
      return <span className="text-success">Hoàn thành cấp thẻ</span>;

    case "Từ chối":
    case "3":
      return <span className="text-danger">Từ chối</span>;

    case "Chờ duyệt":
    case "4":
      return <span className="text-warning">Chờ duyệt</span>;

    default:
      return <span className="text-muted">Không xác định</span>;
  }
}

export function getStatusElementForDataTable(status: string) {
  switch (status) {
    case "Duyệt đăng ký":
      return `<div class="w-100 d-flex align-items-center justify-content-center"><span class="badge bg-inverse-info  rounded-pill fs-5 text-center ">Đã duyệt</span></div>`;

    case "Hoàn thành cấp thẻ":
      return `<div class="w-100 d-flex align-items-center justify-content-center"><span class="badge bg-inverse-success rounded-pill fs-5">Hoàn thành</span></div>`;

    case "Từ chối":
      return `<div class="w-100 d-flex align-items-center justify-content-center"><span class="badge bg-inverse-info rounded-pill text-center fs-5">Từ chối</span></div>`;

    case "Chờ duyệt":
      return `<div class="w-100 d-flex align-items-center justify-content-center"><span class="badge bg-inverse-warning  rounded-pill fs-5">Chờ duyệt</span></div>`;

    default:
      return `<div class="w-100 d-flex align-items-center justify-content-center"><span class="badge text-bg-secondary rounded-pill fs-5">${status}</span></div>`;
  }
}
