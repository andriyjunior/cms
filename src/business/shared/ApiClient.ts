import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { tokenService } from "./TokenService";
import { authService } from "business/auth/AuthService";
import { AuthModel } from "models/auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

class ApiClient {
  private axiosInstance: AxiosInstance;
  private baseURL: string | undefined = BASE_URL;

  constructor() {
    // Set the base URL for the requests
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });

    // Add request interceptors
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = tokenService.getLocalAccessToken();

        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        // Handle request errors here
        return Promise.reject(error);
      }
    );

    // Add response interceptors (if needed)
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // You can modify the response data here
        return response;
      },
      async (error) => {
        const originalConfig = error.config;

        if (error?.response?.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          const refreshToken = tokenService.getLocalRefreshToken();
          if (refreshToken) {
            const response = await this.post<AuthModel>(
              `auth/refresh-token/${refreshToken}`
            );

            if (response) {
              tokenService.setTokenInfo(response);
            }

            this.axiosInstance(originalConfig);
          }

          // error.request.headers["Authorization"] = `Bearer ${refreshToken}`;
          return Promise.reject(error);
        }

        // Handle response errors here
        return Promise.reject(error);
      }
    );
  }
  // Define a method for making GET requests
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then((response) => response.data)
      .catch((error) => {
        // Handle specific error cases or log the error
        throw error;
      });
  }

  // Define a method for making POST requests
  protected async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then((response) => response.data)
      .catch((error) => {
        // Handle specific error cases or log the error
        throw error;
      });
  }

  // Define a method for making PUT requests
  protected async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .put<T>(url, data, config)
      .then((response) => response.data)
      .catch((error) => {
        // Handle specific error cases or log the error
        throw error;
      });
  }

  // Define a method for making DELETE requests
  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .delete<T>(url, config)
      .then((response) => response.data)
      .catch((error) => {
        // Handle specific error cases or log the error
        throw error;
      });
  }
}

export const apiClient = new ApiClient();
export default ApiClient;
