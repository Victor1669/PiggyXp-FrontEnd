import { AxiosRequestConfig } from "axios";

import { api } from "Config/api";
import { AppConfig } from "Config/appConfig";

type FetchApiProps<TBody> = {
  method: "get" | "post" | "delete" | "put" | "patch";
  route: string;
  body?: TBody;
  token?: string;
  showToast?: boolean;
  logError?: boolean;
};

type MessageResponse = { message: string };

type FetchApiResponse<TResponse> = {
  status: number;
  success: boolean;
  data: TResponse & MessageResponse;
};

export async function fetchApi<TBody = object, TResponse = MessageResponse>({
  method,
  route,
  body,
  token = "",
  showToast = false,
  logError = true,
}: FetchApiProps<TBody>): Promise<FetchApiResponse<TResponse>> {
  try {
    if (AppConfig.isPreviewBuild) {
      return {
        status: 200,
        success: true,
        data: "" as unknown as TResponse & MessageResponse,
      };
    }

    const config: AxiosRequestConfig = {
      showToast,
      route,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    let res;

    if (method === "get" || method === "delete") {
      res = await api[method](`/${route}`, config);
    } else {
      res = await api[method](`/${route}`, body, config);
    }

    return {
      status: res.status,
      success: res.status < 300,
      data: res.data,
    };
  } catch (err: any) {
    const status = err.response?.status || 500;
    const errObj = err?.response?.data;
    const errMessage =
      errObj?.message || errObj?.error || err.message || errObj;

    if (logError) {
      console.log("============================== Erro na rota " + route);
      console.log("============================== " + err);
      console.log("============================== " + errObj);
      console.log("============================== " + errObj?.message);
    }

    return {
      status,
      success: status < 300,
      data: errMessage,
    };
  }
}
