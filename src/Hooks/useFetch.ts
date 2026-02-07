import { api } from "@Config/axios";

type useFetchProps = {
  method: "get" | "post" | "delete" | "put";
  rota: string;
  body?: object;
  token?: string;
};

export async function useFetch({
  method,
  rota,
  body,
  token = "",
}: useFetchProps) {
  try {
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    let res;

    if (method === "get" || method === "delete") {
      res = await api[method](`/${rota}`, config);
    } else {
      res = await api[method](`/${rota}`, body, config);
    }

    return {
      status: res.status,
      data: res.data,
    };
  } catch (err: any) {
    return {
      status: err.response?.status ?? 500,
      data: err.response?.data ?? err.message,
    };
  }
}
