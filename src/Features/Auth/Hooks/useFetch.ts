import { AxiosRequestConfig } from "axios";

import { api } from "Config/axios";
import { screenValues } from "Config/screenValues";

import { toastMessage } from "Utils/toast";

type useFetchProps = {
  method: "get" | "post" | "delete" | "put";
  rota: string;
  body?: object;
  token?: string;
  showToastMessage?: boolean;
  logError?: boolean;
};

export async function useFetch({
  method,
  rota,
  body,
  token = "",
  showToastMessage,
  logError = true,
}: useFetchProps) {
  const { isPreviewBuild } = screenValues();
  try {
    if (isPreviewBuild) return { data: "", status: 200 };
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    let res;

    if (method === "get" || method === "delete") {
      res = await api[method](`/api/${rota}`, config);
    } else {
      res = await api[method](`/api/${rota}`, body, config);
    }

    if (res.status < 300 && showToastMessage) {
      toastMessage({
        type: "success",
        text: res.data.message ?? res.data,
      });
    }

    return {
      status: res.status,
      data: res.data,
    };
  } catch (err: any) {
    let errMessage;
    if (logError) {
      const errObj = err?.response?.data;
      errMessage = errObj?.message || errObj?.error || err.message || errObj;
      console.log(err);
      console.log(errObj);
      console.log(errObj?.message);
    }

    if (showToastMessage) {
      toastMessage({
        type: "error",
        text: errMessage,
      });
    }
    return {
      status: err.response?.status || 500,
      data: errMessage,
    };
  }
}
