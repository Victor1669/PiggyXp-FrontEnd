import { useFetch } from "../Hooks/useFetch";

export async function regenLivesApi(token: string) {
  const response = await useFetch({
    method: "put",
    rota: `regen`,
    token,
  });

  return response;
}
