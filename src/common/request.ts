import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// Interface cho các tùy chọn của hàm requestApi
interface RequestApiOptions {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: Record<string, any> | null;
  params?: Record<string, any> | null;
  responseType?:
    | "json"
    | "arraybuffer"
    | "blob"
    | "document"
    | "text"
    | "stream";
  contentType?: string;
}

const apiService = axios.create({
  baseURL: process.env.API_URL, // Base URL từ environment
  withCredentials: true, // Gửi cookies với cross-domain requests
  timeout: 15000, // Timeout request sau 15 giây
});

apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || new AxiosHeaders();
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      console.log("No token found in cookies");
    }

    // Thêm các headers mặc định
    config.headers.set("Accept", "application/json");
    config.headers.set("Content-Type", "application/json");
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (
        status === 401 ||
        (status === 400 && data?.message?.includes("Invalid token"))
      ) {
        console.error("Authorization error: Token expired or invalid.");
        // Xóa token khỏi cookies
        Cookies.remove("access_token");
        // Chuyển hướng về trang đăng nhập
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default async function requestApi({
  endpoint,
  method = "GET",
  data = null,
  params = null,
  responseType = "json",
  contentType = "application/json",
}: RequestApiOptions) {
  return await apiService.request({
    url: endpoint,
    method,
    data,
    params,
    responseType,
    headers: {
      "Content-Type": contentType,
    },
  });
}
