import FileServices from "@/services/file-services";

class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          FileServices.UploadFileForCkEditor(file)
            .then((res) => {
              console.log(res);
              resolve({
                default: `${process.env.FLIPBOOK_URL}${res.url}`,
              });
            })
            .catch((err) => {
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
