"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Lấy file đầu tiên từ input
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target?.result; // Binary string
      const workbook = XLSX.read(bstr, { type: "binary" }); // Đọc workbook từ file Excel

      // Lấy dữ liệu từ sheet đầu tiên
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Chuyển dữ liệu thành JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Excel Data:", jsonData);
    };

    reader.readAsBinaryString(file); // Đọc file dưới dạng binary string
  };
  {
  }
  return (
    <div className="">
      <label
        htmlFor="formFile"
        className="form-label btn btn-outline-success m-0 fs-5 fw-bold"
      >
        Upload file tạo người dùng
      </label>

      <input
        className="form-control fs-5 d-none"
        type="file"
        id="formFile"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ExcelUploader;
