import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react"; // Import NextAuth's getSession

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
  baseURL: process.env.API_URL, // Base URL for API requests
  withCredentials: true, // Send cookies with cross-domain requests
  timeout: 15000, // Request timeout in milliseconds
});

// Request Interceptor
apiService.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Initialize headers if undefined
    config.headers = config.headers || new AxiosHeaders();

    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session && session.user.access_token) {
        console.log("session.access_token:::", session.user.access_token);
        // Add Authorization header if token exists in session
        config.headers.set(
          "Authorization",
          `Bearer ${session?.user.access_token}`
        );
      } else {
        console.log("No token found in session");
      }
    }
    // Set default headers
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

      // Handle 419 (token expired) errors with refresh logic
      if (status === 419 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried

        try {
          const session = await getSession();
          const refreshToken = session?.user;

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await apiService.post("/auth/refresh_token", {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = refreshResponse.data;
          sessionStorage.setItem("access_token", access_token);
          sessionStorage.setItem("refresh_token", refresh_token);

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
            if (refreshError.response?.status === 400) {
              sessionStorage.removeItem("access_token");
              sessionStorage.removeItem("refresh_token");
              window.location.href = "/login";
            }
          }
          return Promise.reject(refreshError);
        }
      }

      if (status === 401) {
        if (typeof window !== "undefined") {
          // window.location.href = "/page401";
        }
      }
    }

    return Promise.reject(error);
  }
);

// Function to make API requests
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
    method: method,
    data: data,
    params: params,
    responseType: responseType,
    headers: {
      "Content-Type": contentType,
    },
  });
}
