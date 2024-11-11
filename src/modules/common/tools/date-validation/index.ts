export const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "").slice(0, 8);
  const cursorPosition = input.selectionStart ?? value.length;

  // Thêm dấu "/" vào đúng vị trí
  if (value.length >= 4) {
    value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
  } else if (value.length >= 2) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }

  input.value = value;

  // Cập nhật vị trí con trỏ
  const newCursorPosition =
    cursorPosition + (value[cursorPosition - 1] === "/" ? 1 : 0);
  input.setSelectionRange(newCursorPosition, newCursorPosition);
};

export const validateDate = (value: string) => {
  // Kiểm tra định dạng dd/mm/yyyy
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(value)) {
    return "Ngày phải có định dạng Ngày/tháng/năm";
  }

  // Tách ngày, tháng, năm
  const parts = value.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const currentYear = new Date().getFullYear();

  // Kiểm tra tháng
  if (month < 1 || month > 12) {
    return "Tháng không hợp lệ. Tháng phải nằm trong khoảng 1-12.";
  }

  // Kiểm tra ngày
  if (day < 1) {
    return "Ngày không hợp lệ. Ngày phải lớn hơn 0.";
  }

  if (month === 2) {
    const isLeapYear = (year: number) =>
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (day > (isLeapYear(year) ? 29 : 28)) {
      return isLeapYear(year)
        ? "Tháng 2 chỉ có 29 ngày trong năm nhuận."
        : "Tháng 2 chỉ có 28 ngày.";
    }
  } else if ([4, 6, 9, 11].includes(month)) {
    if (day > 30) {
      return "Các tháng này chỉ có 30 ngày.";
    }
  }
  if (year > currentYear) {
    return "Năm không hợp lệ. Năm không được lớn hơn năm hiện tại.";
  }

  return true;
};
