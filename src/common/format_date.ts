const formatDateTime = {
  formatDate: (dateString: string): any => {
    if (!dateString) return null;

    // Kiểm tra định dạng ban đầu "dd-mm-yyyy hh:mm:ss"
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("-").map(Number);
    let date = new Date(
      year,
      month - 1,
      day,
      ...(timePart ? timePart.split(":").map(Number) : [])
    );

    // Nếu không hợp lệ, thử định dạng "dd/mm/yyyy hh:mm:ss"
    if (isNaN(date.getTime())) {
      const [dayAlt, monthAlt, yearAlt] = datePart.split("/").map(Number);
      date = new Date(
        yearAlt,
        monthAlt - 1,
        dayAlt,
        ...(timePart ? timePart.split(":").map(Number) : [])
      );
    }

    // Nếu vẫn không hợp lệ, trả về null
    if (isNaN(date.getTime())) {
      return null;
    }

    // Format lại ngày theo "dd/mm/yyyy"
    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  },

  formatDatePlusOneYear(dateString: string): any {
    if (!dateString) return null;

    // Kiểm tra định dạng ban đầu "dd-mm-yyyy hh:mm:ss"
    const [datePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("-").map(Number);
    let date = new Date(year, month - 1, day);

    // Nếu không hợp lệ, thử định dạng "dd/mm/yyyy"
    if (isNaN(date.getTime())) {
      const [dayAlt, monthAlt, yearAlt] = datePart.split("/").map(Number);
      date = new Date(yearAlt, monthAlt - 1, dayAlt);
    }

    // Nếu vẫn không hợp lệ, trả về false
    if (isNaN(date.getTime())) {
      return false;
    }

    // Tăng thêm 1 năm
    date.setFullYear(date.getFullYear() + 1);

    // Format lại ngày theo "dd/mm/yyyy"
    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  },
};

export default formatDateTime;
