const formatDateTime = {
  formatDate: (dateString: string): any => {
    if (!dateString) return null;

    // Chuyển đổi chuỗi ISO 8601 thành đối tượng Date
    const date = new Date(dateString);

    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(date.getTime())) {
      return null;
    }

    // Định dạng lại ngày theo "dd/mm/yyyy"
    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  },

  formatDatePlusOneYear(dateString: string): any {
    if (!dateString) return null;

    // Chuyển đổi chuỗi ISO 8601 thành đối tượng Date
    const date = new Date(dateString);

    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(date.getTime())) {
      return false;
    }

    // Tăng thêm 1 năm
    date.setFullYear(date.getFullYear() + 1);

    // Định dạng lại ngày theo "dd/mm/yyyy"
    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  },
};

export default formatDateTime;
