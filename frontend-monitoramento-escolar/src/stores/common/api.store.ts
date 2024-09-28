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
     * Função para analisar cookies e retornar o valor de um cookie pelo nome.
     * @param name - O nome do cookie.
     * @returns O valor do cookie ou undefined se não encontrado.
     */
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return parts.pop()?.split(';').shift() || undefined;
    };

    const token = getCookie('token');

    // Define o token no cabeçalho da solicitação se ele existir
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
