import fetch from "@/common/request";

const Service = "users";
const UserServices = {
  Profile: async () => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/profile`,
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
