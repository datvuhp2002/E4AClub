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
};
export default UserServices;
