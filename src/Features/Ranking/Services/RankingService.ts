import { useFetch } from "@Auth/Hooks/useFetch";

export async function RankingService() {
  const response = await useFetch({
    method: "get",
    rota: "ranking",
  });

  return response;
}
