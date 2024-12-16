import fetch from "@/common/request";

const Service = "user";

const FileServices = {
  UploadFileForCkEditor: async (file: File) => {
    try {
      // Di chuyển logic FormData ở đây
      const formData = new FormData();
      formData.append("file", file);

      // Gửi request API
      const res: any = await fetch({
        endpoint: `/${Service}/upload`, // Endpoint upload file
        method: "POST",
        data: formData,
        contentType: "multipart/form-data", // Axios tự thêm boundary
      });

      return res;
    } catch (err) {
      console.error("Error during file upload:", err);
      throw err;
    }
  },
};

export default FileServices;
