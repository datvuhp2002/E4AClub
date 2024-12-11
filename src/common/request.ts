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
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status } = error.response;

      if (status === 419 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = Cookies.get("refresh_token");
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await apiService.post("/auth/refresh_token", {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = refreshResponse.data;
          Cookies.set("access_token", access_token, { expires: 1 });
          Cookies.set("refresh_token", refresh_token, { expires: 7 });

          originalRequest.headers =
            originalRequest.headers || new AxiosHeaders();
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${access_token}`
          );

          return apiService(originalRequest);
        } catch (refreshError: any) {
          console.error("Token refresh failed:", refreshError);

          if (typeof window !== "undefined") {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }
      if (status === 401) {
        if (typeof window !== "undefined") {
          throw new Error("Unauthorized, redirecting to login");
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
