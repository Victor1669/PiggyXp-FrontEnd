import { useFetch } from "../Hooks/useFetch";

export async function RegenLivesService(id: number, token: string) {
  const response = await useFetch({
    method: "put",
    rota: `regen?id=${id}`,
    token,
    logError: false,
  });

  return response;
}
