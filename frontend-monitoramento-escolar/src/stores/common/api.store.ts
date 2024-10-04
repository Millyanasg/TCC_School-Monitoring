import { hasTokens, logout } from '@frontend/services/common/auth.service';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE as string;

/**
 * An Axios instance configured with default settings for making API requests.
 *
 * @constant
 * @type {AxiosInstance}
 *
 * @property {string} baseURL - The base URL for the API requests.
 * @property {number} timeout - The timeout duration for the requests in milliseconds.
 * @property {boolean} withCredentials - Indicates whether or not cross-site Access-Control requests should be made using credentials.
 *
 * @example
 * ```typescript
 * import { apiInstance } from '../ApiStore';
 *
 * apiInstance.get('/users').then((response) => {
 *  console.log(response.data);
 * });
 * ```
 */
export const apiInstance = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    /**
     * Retrieves the value of a specified cookie by its name.
     *
     * @param name - The name of the cookie to retrieve.
     * @returns The value of the cookie if found, otherwise `undefined`.
     */
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return parts.pop()?.split(';').shift() || undefined;
    }

    const token = getCookie('token');

    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = token;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (hasTokens()) {
        logout();
      }
    }
    return Promise.reject(error);
  },
);
