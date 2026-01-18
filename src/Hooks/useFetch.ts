import axios from "axios";
import { env } from "../Config/env";

const BASE_URL = env.backEndUrl;

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
      res = await axios[method](`${BASE_URL}/${rota}`, config);
    } else {
      res = await axios[method](`${BASE_URL}/${rota}`, body, config);
    }

    return {
      status: res.status,
      data: res.data,
    };
  } catch (err: any) {
    console.log("ERRO COMPLETO:", err);

    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);

    return {
      status: err.response?.status ?? 500,
      data: err.response?.data ?? { message: "Erro desconhecido" },
    };
  }
}
