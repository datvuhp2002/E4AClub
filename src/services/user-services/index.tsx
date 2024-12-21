import fetch from "@/common/request";

const Service = "user";
const UserServices = {
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
