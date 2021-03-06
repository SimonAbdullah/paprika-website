import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { NEXT_LOCALE } from "../../core/app/app.constants";
import { isBrowser } from "../../core/functions";
import Cookies from "universal-cookie";
import RequestConfig from "./request-config";

export interface IBaseApiResponse<T> {
  result: T;
  targetUrl: any | null;
  success: boolean;
  error: any | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

export interface PagedResultDto<T> {
  totalCount: number;
  items: T[];
}

export default class ApiProvider {
  private api: AxiosInstance;
  public constructor(config: RequestConfig) {
    this.api = axios.create(config);
    this.api.interceptors.request.use((req: AxiosRequestConfig) => {
      const cookies = new Cookies(req.headers.cookies);
      return {
        ...req,
        headers:
          process.env.NODE_ENV === "production"
            ? {
                ...req.headers,
                "Paprica-Culture":
                  isBrowser() && cookies.get(NEXT_LOCALE)
                    ? cookies.get(NEXT_LOCALE)
                    : "en",
                "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
                "x-api-scope": "1",
              }
            : {
                ...req.headers,
                "Paprica-Culture":
                  isBrowser() && cookies.get(NEXT_LOCALE)
                    ? cookies.get(NEXT_LOCALE)
                    : "en",
              },
      };
    });
  }
  public async request<T>(config: RequestConfig): Promise<any> {
    const response = await this.api.request<IBaseApiResponse<T>>(config);
    return response.data;
  }
}
