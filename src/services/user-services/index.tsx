import fetch from "@/common/request";

const Service = "user";
const UserServices = {
  UploadImage: async (file: File) => {
    try {
      if (!(file instanceof File)) {
        console.error("Đây không phải là một tệp tin.");
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      const res: any = await fetch({
        endpoint: `/${Service}/upload-image`,
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

  GetAllUser: async () => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/get-all`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },

  CreateUser: async (data: ICreateUserDto) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/create-user`,
        method: "POST",
        data,
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  UpdateUser: async (data: IUpdateUser) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/update-user`,
        method: "PUT",
        data,
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  ChangePasswordUser: async (data: IUpdateUser) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/change-password`,
        method: "PUT",
        data,
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },

  CreateUserBatch: async (data: any) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/create-user-batch`,
        method: "POST",
        data,
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  EnrollCourse: async (course_id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/enroll-course/${course_id}`,
        method: "POST",
        data: {},
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  Info: async () => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/info`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  GetUserById: async (id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/get-user-by-id?id=${id}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  DeleteUser: async (id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/delete-user/${id}`,
        method: "DELETE",
        data: {},
      });
      console.log(res);
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
};
export default UserServices;
