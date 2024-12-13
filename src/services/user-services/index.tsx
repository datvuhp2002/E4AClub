import fetch from "@/common/request";

const Service = "user";
const UserServices = {
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
};
export default UserServices;
