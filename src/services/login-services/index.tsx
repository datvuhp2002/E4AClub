import fetch from "@/common/request";

const Service = "auth";
const LoginServices = {
  Login: async (data: any) => {
    let res: any = await fetch({
      endpoint: `/${Service}/login`,
      method: "POST",
      data,
    });
    return res;
  },
};
export default LoginServices;
