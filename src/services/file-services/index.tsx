import fetch from "@/common/request";

const Service = "ck-editor";

const FileServices = {
  UploadFileForCkEditor: async (file: File) => {
    try {
      if (file instanceof File) {
        console.log("Đây là một tệp tin:", file);
      } else {
        console.log("Đây không phải là một tệp tin.");
      }

      console.log("FILE:::", file);
      const formData = new FormData();
      formData.append("upload", file);
      const res: any = await fetch({
        endpoint: `/${Service}`,
        method: "POST",
        data: formData,
        responseType: "json",
        contentType: "multipart/form-data",
      });
      return res;
    } catch (err) {
      console.error("Error during file upload:", err);
      throw err;
    }
  },
};

export default FileServices;
