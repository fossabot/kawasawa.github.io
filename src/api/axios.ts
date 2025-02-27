import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios';

export const createInstance = <T>(retryLimit = 3) => {
  const client = axios.create();
  if (retryLimit <= 0) return client;

  client.interceptors.response.use(
    (value: AxiosResponse<T>) => value,
    async (error: AxiosError) => {
      // レスポンスとリトライ状況の確認
      if (retryLimit <= 0) {
        console.error(error);
        return Promise.reject(error);
      }
      retryLimit--;
      console.warn(error);
      console.warn(`retryLimit=${retryLimit}`);

      // リクエストの再試行
      const method = error.config.method;
      const url = error.config.url;
      const data = error.config.data !== undefined ? JSON.parse(error.config.data) : undefined;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return invoke<T>(client, method!, url!, data);
    }
  );
  return client;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invoke = <T>(client: AxiosInstance, method: Method, url: string, data?: any) => {
  switch (method.toUpperCase()) {
    case 'GET':
      return client.get<T>(url);
    case 'POST':
      return client.post<T>(url, data);
    case 'PATCH':
      return client.patch<T>(url, data);
    case 'DELETE':
      return client.delete<T>(url, { data });
    default:
      throw new Error(`Not implemented retry method: method=${method}`);
  }
};
