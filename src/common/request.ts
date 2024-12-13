import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

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
  baseURL: process.env.API_URL, // Base URL cho API requests
  withCredentials: true, // Gửi cookies với cross-domain requests
  timeout: 15000, // Timeout request sau 15 giây
});

// Request Interceptor
apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || new AxiosHeaders();

    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      console.log("No token found in cookies");
    }
    config.headers.set("Accept", "application/json");
    config.headers.set("Content-Type", "application/json");
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("Unauthorized: Redirecting to login...");
        if (typeof window !== "undefined") {
          // Xóa cookie access_token nếu tồn tại
          Cookies.remove("access_token");
          window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
        }
      }
    }
    return Promise.reject(error);
  }
);

// Hàm thực hiện API requests
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
