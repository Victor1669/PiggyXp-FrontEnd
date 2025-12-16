import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

type useFetchProps = {
  method: "get" | "post" | "delete" | "put";
  rota: string;
  body?: object;
};

export async function useFetch({ method, rota, body }: useFetchProps) {
  try {
    const res = await axios[method](`${""}/${rota}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { status: res.status, message: res.data.res };
  } catch (res: any) {
    return { status: res.status, message: res.response.data.res };
  }
}
