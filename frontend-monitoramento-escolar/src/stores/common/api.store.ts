import {
  hasTokens,
  logout,
  refreshToken,
} from '@frontend/services/common/auth.service';
import { get_cookie } from '@frontend/services/common/cookieUtil.service';
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
    const token = get_cookie('token');
    if (token) {
      // verify if the token is expired
      refreshToken();

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
    return Promise.reject(error);
  },
);
