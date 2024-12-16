import FileServices from "@/services/file-services";

class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader; // File loader từ CKEditor
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // Gọi FileServices với file, không cần chuẩn bị FormData
          FileServices.UploadFileForCkEditor(file)
            .then((res) => {
              resolve({
                default: `${process.env.API_URL}/${res.url}`, // URL trả về từ server
              });
            })
            .catch((err) => {
              console.error("File upload failed:", err);
              reject(err);
            });
        })
    );
  }

  abort() {
    console.log("Upload aborted.");
  }
}

export default CustomUploadAdapter;
