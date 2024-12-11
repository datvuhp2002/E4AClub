import requestApi from "@/common/request";
import Cookies from "js-cookie";

const Service = "auth";

const AuthServices = {
  // Hàm Login
  Login: async (data: Record<string, any>) => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}/login`,
        method: "POST",
        data,
      });
      console.log(res);
      if (res) {
        Cookies.set("email", data.email);
        Cookies.set("access_token", res.access_token, { expires: 1 });
        Cookies.set("refresh_token", res.refresh_token, { expires: 7 });
        Cookies.set("role", res.role, { expires: 7 });
      }
      return res;
    } catch (error) {
      console.log("Login failed:", error);
    }
  },

  // Hàm Logout
  Logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.href = "/auth/login"; // Chuyển hướng về trang login
  },
};

export default AuthServices;