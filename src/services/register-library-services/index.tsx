import fetch from "@/common/request";

const Service = "CarRegister";
const RegisterLibraryServices = {
  Register: async (data: any) => {
    let res: any = await fetch({
      url: `/${Service}/insert-register`,
      method: "post",
      data,
    });
    return res;
  },
  InitSearch: async () => {
    let res: any = await fetch({
      url: `/${Service}/init-select`,
      method: "get",
    });
    return res;
  },
  GetCardStatus: async () => {
    let res: any = await fetch({
      url: `/${Service}/get-list-card-status`,
      method: "get",
    });
    return res;
  },
  UploadAvatar: async (data: File, id: String) => {
    var formData = new FormData();
    formData.append("file", data);
    let res: any = await fetch({
      url: `/${Service}/upload-avatar?id=${id}`,
      method: "post",
      data: formData,
    });
    return res;
  },
};
export default RegisterLibraryServices;
