import { api } from "Config/axios";

import { toastMessage } from "Utils/toast";

type useFetchProps = {
  method: "get" | "post" | "delete" | "put";
  rota: string;
  body?: object;
  token?: string;
  showToastMessage?: boolean;
};

export async function useFetch({
  method,
  rota,
  body,
  token = "",
  showToastMessage,
}: useFetchProps) {
  try {
    const config = {
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
      console.log(res.data.message);
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
    if (showToastMessage) {
      toastMessage({
        type: "error",
        text: err?.error ?? err ?? err.message,
      });
    }
    return {
      status: err.response?.status ?? 500,
      data: err?.message ?? err?.response?.data ?? err?.error ?? err,
    };
  }
}
