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
      if (res.success) {
        Cookies.set("email", res.data.user.email, { expires: 7 });
        Cookies.set("name", res.data.user.name, { expires: 7 });
        Cookies.set("access_token", res.data.user.accessToken, { expires: 1 });
        Cookies.set("role", res.data.user.role, { expires: 7 });
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
