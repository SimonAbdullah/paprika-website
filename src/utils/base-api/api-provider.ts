import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { TOKEN_KEY } from "../../core/auth/auth.constants";
import RequestConfig from "./request-config";

export interface IBaseApiResponse<T> {}

export default class ApiProvider {
  private api: AxiosInstance;
  public constructor(config: RequestConfig) {
    this.api = axios.create(config);
    this.api.interceptors.request.use((req: AxiosRequestConfig) => {
      const cookies = new Cookies(req.headers.cookies);
      return {
        ...req,
        headers: {
          ...req.headers,
          Authorization: `Bearer ${cookies.get(TOKEN_KEY)}`,
        },
      };
    });
    this.api.interceptors.response.use((res: AxiosResponse) => {
      if (res.data === "") {
        return { ...res, data: null };
      }
      return res;
    });
  }
  public async request<T>(config: RequestConfig): Promise<any> {
    const response = await this.api.request<IBaseApiResponse<T>>(config);
    return response.data;
  }
}
